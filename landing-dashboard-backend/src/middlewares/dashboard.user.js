const jwt = require("jsonwebtoken");

async function checkForAuthenticstion(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

function checkAdminRole(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
}

module.exports = {
  checkForAuthenticstion,
  checkAdminRole,
};
