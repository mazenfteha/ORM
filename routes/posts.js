const express = require('express')

router = express.Router()

const {createPost, getUserPosts } = require('../controllers/posts')

router.route('/').post(createPost).get(getUserPosts)


module.exports = router