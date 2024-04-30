const express = require('express')
const {login, signup, update, getSingleUser, changePassword} = require("../controllers/userController");

const router = express.Router()

//login
router.post('/login',login)

//signup
router.post('/signup',signup)

//update
router.patch('/update/:id',update)

//get sinle
router.get('/:id',getSingleUser)

//change password
router.patch('/:id/passwordChange',changePassword)

module.exports = router