const express = require("express");
const {
  registerUser,
  loginUser,
  getUserDetails,
} = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/me", authenticate, getUserDetails);

module.exports = router;
