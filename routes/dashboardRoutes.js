const express = require("express");
const {
  getDashboard,
  updateDashboard,
  getAllLogs,
  updateDashboardBeacon,
} = require("../controllers/dashboardController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch dashboard data for a specific date
router.get("/:date", authenticate, getDashboard);

// Create or update dashboard data
router.post("/", authenticate, updateDashboard);

// Fetch all logs
router.get("/logs/all", authenticate, getAllLogs);

module.exports = router;
