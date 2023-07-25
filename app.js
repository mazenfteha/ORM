const express = require('express')

const { sequelize, User } = require('./models')

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
        return res.status(500).json(error)
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
            where: { uuid }
         })

        return res.json(user)
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