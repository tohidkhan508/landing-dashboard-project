const express = require("express");
const router = express.Router();
const {
  handleUserSignup,
  handleUserlogin,
} = require("../controllers/frontend.controller");

router.post("/signup", handleUserSignup);
router.post("/login", handleUserlogin);

module.exports = router;
