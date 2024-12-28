const jwt = require("jsonwebtoken");
const Dashboard = require("../models/dashboard");

// Fetch dashboard data for a specific day
exports.getDashboard = async (req, res) => {
  const { date } = req.params;

  try {
    const startOfDay = date;

    const dashboardEntry = await Dashboard.findOne({
      userId: req.user.userId,
      date: startOfDay,
    });

    if (!dashboardEntry) {
      return res.status(404).json({ message: "No data found for this date" });
    }

    res.status(200).json(dashboardEntry);
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error.message });
  }
};

// Create or update dashboard data
exports.updateDashboard = async (req, res) => {
  const { activeTimer, date, tasks } = req.body;
  try {
    const startOfDay = date;

    const updatedEntry = await Dashboard.findOneAndUpdate(
      { userId: req.user.userId, date: startOfDay }, // Find by user and date
      { tasks, activeTimer }, // Update tasks
      { new: true, upsert: true } // Create if not found
    );

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error("Error updating dashboard:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get all dashboard logs for a user
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Dashboard.find({ userId: req.user.userId }).sort({
      date: -1,
    });

    if (!logs.length) {
      return res.status(404).json({ message: "No logs found" });
    }

    res.status(200).json(logs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
