
const Reservation = require("../models/Reservation");

const Room = require("../models/Room"); 

exports.bookRoom = async (req, res) => {
  const { roomId, startTime, endTime } = req.body;

  if (new Date(startTime) >= new Date(endTime)) {
    return res.status(400).json({ message: "Invalid time range" });
  }

  // Check overlapping bookings
  const conflict = await Reservation.findOne({
    roomId,
    status: "approved",
    startTime: { $lt: new Date(endTime) },
    endTime: { $gt: new Date(startTime) }
  });

  if (conflict) {
    return res.status(400).json({
      message: "Room already booked for selected time"
    });
  }

  // GET ROOM TO ACCESS PRICE
  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  // CALCULATE DURATION IN MINUTES
  const durationMs = new Date(endTime) - new Date(startTime);
  const durationMinutes = Math.ceil(durationMs / (1000 * 60));

  // CALCULATE TOTAL PRICE
  const totalPrice = durationMinutes * room.pricePerMinute;

  const reservation = await Reservation.create({
    userId: req.user.id,
    roomId,
    startTime,
    endTime,
    totalPrice,          // SAVE THIS
    status: "approved"
  });

  res.json(reservation);
};



exports.myReservations = async (req, res) => {
  const reservations = await Reservation.find({
    userId: req.user.id
  }).populate("roomId");

  res.json(reservations);
};

exports.cancelReservation = async (req, res) => {
  await Reservation.findByIdAndUpdate(
    req.params.id,
    { status: "cancelled" },
    { new: true }
  );

  res.json({ message: "Reservation Cancelled" });
};
