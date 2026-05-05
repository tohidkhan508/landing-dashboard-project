const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ✅ ENV CHECK (server start pe hi fail ho jaye)
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET missing in .env");
}

// ================= SIGNUP =================
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // email normalize (IMPORTANT 🔥)
    const normalizedEmail = email.toLowerCase();

    // check existing user
    const existingUser = await db.query("SELECT id FROM users WHERE email=$1", [
      normalizedEmail,
    ]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    const result = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
      [name, normalizedEmail, hashedPassword, "user"],
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// ================= LOGIN =================
async function handleUserlogin(req, res) {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    // find user
    const isUser = await db.query("SELECT * FROM users WHERE email=$1", [
      normalizedEmail,
    ]);

    if (!isUser.rows.length) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const dbUser = isUser.rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, dbUser.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // generate token
    const token = jwt.sign(
      {
        id: dbUser.id,
        email: dbUser.email,
        role: dbUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

module.exports = {
  handleUserSignup,
  handleUserlogin,
};
