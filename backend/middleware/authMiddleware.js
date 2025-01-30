const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protect = async (req, res, next) => {
  try {
    // Extract the token from authorization header
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user based on the decoded user ID from the token
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ Token verified. User ID:", req.user.id);
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
