const mongoose = require("mongoose");

const paritySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  record: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  totalReacore: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("ParityRecord", paritySchema);