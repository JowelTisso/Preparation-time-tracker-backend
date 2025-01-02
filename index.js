require("dotenv").config();
require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.send("Preparation Tracker API is running");
});

//Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/dashboard", dashboardRoutes);

const calendarRoutes = require("./routes/calendarRoutes");
app.use("/calendar", calendarRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
