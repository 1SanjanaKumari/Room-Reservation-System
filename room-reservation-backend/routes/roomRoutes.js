const router = require("express").Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom
} = require("../controllers/roomController");

const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createRoom
);

router.get("/", verifyToken, getRooms);
router.put("/:id", verifyToken, isAdmin, updateRoom);
router.delete("/:id", verifyToken, isAdmin, deleteRoom);

module.exports = router;
