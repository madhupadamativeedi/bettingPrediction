const mongoose = require("mongoose");



const betRecordSchema = new mongoose.Schema({
    betRecoredID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParityRecord"
    },
    betONRed: {
        type: Number,
    },
    betOnGreen:{
        type: Number,
    }
})



module.exports = mongoose.model("BetRecord", betRecordSchema);