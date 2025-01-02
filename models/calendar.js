const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  note: {
    type: String,
    default: "",
  },
});

// Ensure each user can have only one entry per date
CalendarSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Calendar", CalendarSchema);
