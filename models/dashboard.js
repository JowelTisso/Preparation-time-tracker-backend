const mongoose = require("mongoose");
const { getCurrentDate } = require("../utils");

const DashboardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  activeTimer: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    required: true,
    default: getCurrentDate(),
    unique: false,
  },
  formattedDate: {
    type: String,
    required: true,
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
