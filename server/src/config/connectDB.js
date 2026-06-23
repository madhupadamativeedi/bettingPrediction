const mongoose = require('mongoose');

const dotenv = require('dotenv');
const { parity } = require('../controllers/parityRecord');


dotenv.config();

/**
 * @name connectDB
 * @description Connects to the MongoDB database using Mongoose.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws {Error} Throws an error if the connection fails.
 */

async function connectDB(){
try{
    await  mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected successfully");
        parity()
}
catch(error){
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
}
}

module.exports = connectDB;