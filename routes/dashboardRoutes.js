const express = require("express");
const {
  getDashboard,
  updateDashboard,
  getAllLogs,
} = require("../controllers/dashboardController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:date", authenticate, getDashboard);

router.post("/", authenticate, updateDashboard);

router.get("/logs/all", authenticate, getAllLogs);

module.exports = router;
