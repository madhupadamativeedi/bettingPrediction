

const express = require("express");


const { parity, totalRecords } = require("../controllers/parityRecord");

const parityRoute = express.Router();

parityRoute.get("/parity", parity);
parityRoute.get("/totalrecords", totalRecords);

module.exports = parityRoute;