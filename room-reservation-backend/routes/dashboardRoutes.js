const router = require("express").Router();
const { getStats } = require("../controllers/dashboardController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", verifyToken, isAdmin, getStats);

module.exports = router;
