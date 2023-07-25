const { User } = require('../models')

//create user
const createUser =  async(req,res)=> {
    const { name, email, role } = req.body

    try {
        const user = await User.create({ name, email, role })

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

//fetch all users
const getAllUsers = async (req,res) => {
    try {
        const user = await User.findAll()

        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
}

//find one user
const findOneUser = async (req,res) => {
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
}

//update user
const updateUser = async (req,res) => {

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
}

//delete user
const deleteUser = async (req,res) => {
    const  uuid  = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid } })
        await user.destroy()

        return res.json({ message : 'User deleted!'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
}

module.exports = {
    createUser,
    getAllUsers,
    findOneUser,
    updateUser,
    deleteUser,
}