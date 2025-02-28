const Dashboard = require("../models/dashboard");

// Fetch dashboard data for a specific day
exports.getDashboard = async (req, res) => {
  const { date } = req.params;

  try {
    const startOfDay = new Date(Number(date));
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
  const userId = req.user.userId;

  try {
    const startOfDay = new Date(date);

    let dashboardEntry = await Dashboard.findOne({
      userId: userId,
      date: startOfDay,
    });

    if (dashboardEntry) {
      dashboardEntry.tasks = tasks;
      dashboardEntry.activeTimer = activeTimer;
    } else {
      const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      dashboardEntry = new Dashboard({
        userId: userId,
        date: startOfDay,
        formattedDate: formattedDate,
        tasks: tasks,
        activeTimer: activeTimer,
      });
    }

    const updatedEntry = await dashboardEntry.save();

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
      query.$or = [{ formattedDate: { $regex: search, $options: "i" } }];
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
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
