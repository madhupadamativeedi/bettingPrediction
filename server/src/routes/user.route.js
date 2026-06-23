
const register = require('../controllers/register')
const express = require('express');

const userRouter = express.Router();

/**
 * @name registerUser
 * @description Registration route 
 */
userRouter.post("/register", register.registerUser)

/**
 * @name loginUser
 * @description user login route 
 */
userRouter.post("/login", register.loginUser) 





module.exports = userRouter