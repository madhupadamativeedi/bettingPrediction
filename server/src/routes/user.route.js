
const register = require('../controllers/register')
const express = require('express');
const authMiddleWare = require('../middleWares/auth.middleWare');

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


userRouter.get("/me", authMiddleWare, register.getUser);

/**
 * @name LogOut
 * @description user LogOut route 
 */
userRouter.post("/logout",authMiddleWare, register.logOut)






module.exports = userRouter