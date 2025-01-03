const Calendar = require("../models/calendar");

exports.saveCheckedDate = async (req, res) => {
  try {
    const { userId, date, isChecked, note } = req.body;
    const newData = {
      isChecked,
    };

    if (note) {
      newData["note"] = note;
    }
    const calendarEntry = await Calendar.findOneAndUpdate(
      { userId, date },
      newData,
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Date status saved successfully",
      data: calendarEntry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save date status",
      error: error.message,
    });
  }
};

exports.getCalendarData = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    const calendarData = await Calendar.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });

    const formattedData = calendarData.reduce((acc, entry) => {
      acc[entry.date] = {
        checked: entry.isChecked,
        note: entry.note,
      };
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: "Calendar data fetched successfully",
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch calendar data",
      error: error.message,
    });
  }
};
