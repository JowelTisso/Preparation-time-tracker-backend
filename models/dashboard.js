const mongoose = require("mongoose");

const DashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a user (if you implement user authentication later)
    required: true,
    ref: "User",
  },
  activeTimer: {
    type: String,
    default: null,
  },
  date: {
    type: Number,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), // Default to start of the day
    unique: false,
  },
  tasks: {
    coding: {
      type: Number,
      default: 0,
    },
    interview: {
      type: Number,
      default: 0,
    },
    job: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);
