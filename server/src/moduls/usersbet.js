const mongoose = require("mongoose");



const userBetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    betRecoredID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParityRecord",
        required: true,
    },
    userBetOnRed: {
        type: Number,

    },
    userBetOnGreen: {
        type: Number,

    }
})


module.exports = mongoose.model("usersbet", userBetSchema);