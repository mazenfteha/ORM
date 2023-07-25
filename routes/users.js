const express = require('express')

router = express.Router()

const {    createUser,
    getAllUsers,
    findOneUser,
    updateUser,
    deleteUser } = require('../controllers/users')


router.route('/').post(createUser).get(getAllUsers)
router.route('/:uuid').get(findOneUser).put(updateUser).delete(deleteUser)


module.exports = router