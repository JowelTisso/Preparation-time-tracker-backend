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
      { userId: req.user.userId, date: startOfDay },
      { tasks, activeTimer },
      { new: true, upsert: true }
    );

    res.status(200).json(updatedEntry);
  } catch (error) {
    console.error("Error updating dashboard:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", startDate, endDate } = req.query;

    const query = { userId: req.user.userId };

    if (search) {
      query.$or = [{ date: { $regex: search, $options: "i" } }];
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = startDate;
      }
      if (endDate) {
        query.date.$lte = endDate;
      }
    }

    const logs = await Dashboard.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalLogs = await Dashboard.countDocuments(query);

    if (!logs.length) {
      return res.status(404).json({ message: "No logs found" });
    }

    res.status(200).json({
      logs,
      pagination: {
        totalLogs,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalLogs / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
