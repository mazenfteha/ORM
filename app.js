const express = require('express')

const { sequelize, User, Post } = require('./models')

const app = express()
app.use(express.json())

//routes
//create user
app.post('/users', async(req,res)=> {
    const { name, email, role } = req.body

    try {
        const user = await User.create({ name, email, role })

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

//fetch all users
app.get('/users', async (req,res) => {
    try {
        const user = await User.findAll()

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
})

//find one user
app.get('/users/:uuid', async (req,res) => {
    const  uuid  = req.params.uuid
    try {
        const user = await User.findOne({ 
            where: { uuid },
            include: 'posts',
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
})

//delete user
app.delete('/users/:uuid', async (req,res) => {
    const  uuid  = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid } })
        await user.destroy()

        return res.json({ message : 'User deleted!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
})

//update user
app.put('/users/:uuid', async (req,res) => {

    const  uuid  = req.params.uuid
    const { name, email, role } = req.body

    try {
        const user = await User.findOne({ where: { uuid }} )

        user.name = name
        user.email = email
        user.role = role

        await user.save()

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
})

//create Post
app.post('/posts', async (req,res) => {
    const { userUuid, body} = req.body
    try {
        //fetch the user based on this userUuid
        const user = await User.findOne({ where: { uuid: userUuid } })

        const post = await Post.create({ body, userId: user.id })

        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
})

app.get('/posts', async (req,res) => {
    try {
        const posts = await Post.findAll({ include: 'user' })

        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
})


app.listen({ port: 5000 },async ()=> {
    console.log('Server running on port 5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})