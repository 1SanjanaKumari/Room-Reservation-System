const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },

  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Room" 
  },

  startTime: Date,
  endTime: Date,

  totalPrice: {            // added price
    type: Number,
    required: true
  },

  status: { 
    type: String, 
    default: "approved" 
  }

}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
