const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: String,
  capacity: Number,
  location: String,
  pricePerMinute: Number,

  image: {
    data: String,        // base64 string
    contentType: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
