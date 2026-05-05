const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    //Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    //check user exist
    const existingUser = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, hashedPassword],
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log("Signup Error", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

async function handleUserlogin(req, res) {
  try {
    const { email, password } = req.body;

    console.log("BODY:", req.body);

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required",
      });
    }

    // check user
    const isUser = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    console.log("USER FOUND:", isUser.rows);

    // ❗ FIXED CONDITION
    if (!isUser.rows.length) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const dbUser = isUser.rows[0];

    console.log("INPUT PASSWORD:", password);
    console.log("HASHED PASSWORD:", dbUser.password);

    // password match
    const isMatch = await bcrypt.compare(password, dbUser.password);

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // token
    const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(500).json({ success: false });
  }
}

module.exports = {
  handleUserSignup,
  handleUserlogin,
};
