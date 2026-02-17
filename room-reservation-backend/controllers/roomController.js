const Room = require("../models/Room");

exports.createRoom = async (req, res) => {
  try {
    const { roomName, capacity, location, pricePerMinute } = req.body;

    let imageData = null;

    if (req.file) {
      imageData = {
        data: req.file.buffer.toString("base64"),
        contentType: req.file.mimetype
      };
    }

    const room = await Room.create({
      roomName,
      capacity,
      location,
      pricePerMinute,
      image: imageData
    });

    res.json(room);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating room" });
  }
};


exports.getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.updateRoom = async (req, res) => {
  const room = await Room.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(room);
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room Deleted" });
};
