const express = require('express')
const {userControlller} = require('../controllers/userController')
const { userLoginController } = require('../controllers/userLoginController')
const userRouter = express.Router()

userRouter.post("/signup",userControlller)
userRouter.post("/login",userLoginController)
module.exports = {
    userRouter
}