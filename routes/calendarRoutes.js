const express = require("express");
const {
  saveCheckedDate,
  getCalendarData,
} = require("../controllers/calendarController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/update", saveCheckedDate);

router.get("/month", authenticate, getCalendarData);

module.exports = router;
