const { Post, User } = require('../models')



//create Post
const createPost = async (req,res) => {
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
}

const getUserPosts = async (req,res) => {
    try {
        const posts = await Post.findAll({ include: 'user' })

        return res.json(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error : 'Something went wrong'})
    }
}

module.exports = {
    createPost,
    getUserPosts
}