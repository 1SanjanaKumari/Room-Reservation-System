const User = require("../models/User");
const Room = require("../models/Room");
const Reservation = require("../models/Reservation");

exports.getStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalRooms = await Room.countDocuments();
  const totalReservations = await Reservation.countDocuments();

  const today = new Date();
  today.setHours(0,0,0,0);

  const todayBookings = await Reservation.countDocuments({
    createdAt: { $gte: today }
  });

  res.json({
    totalUsers,
    totalRooms,
    totalReservations,
    todayBookings
  });
};
