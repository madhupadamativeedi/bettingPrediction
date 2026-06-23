

const express = require("express");
const { dummydata } = require("../controllers/register");
const authMiddleWare = require("../middleWares/auth.middleWare");


const dummyRoute = express.Router();

dummyRoute.get('/dummy',authMiddleWare, dummydata)



module.exports = dummyRoute