const express = require("express");
const { userBetController } = require("../controllers/usersBet.controller");
const authMiddleWare = require("../middleWares/auth.middleWare");

const userBetRoute = express.Router();

userBetRoute.post("/userbet",authMiddleWare, userBetController)





module.exports = userBetRoute;