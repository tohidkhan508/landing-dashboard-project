const express = require("express");
const router = express.Router();
const {
  handleUserSignup,
  handleUserlogin,
} = require("../controllers/dashboard.user");

// Public routes
router.post("/signup", handleUserSignup);
router.post("/login", handleUserlogin);

module.exports = router;
