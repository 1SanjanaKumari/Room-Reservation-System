const router = require("express").Router();
const {
  bookRoom,
  myReservations
} = require("../controllers/reservationController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, bookRoom);
router.get("/my", verifyToken, myReservations);


const { cancelReservation } = require("../controllers/reservationController");

router.put("/cancel/:id", verifyToken, cancelReservation);


module.exports = router;
