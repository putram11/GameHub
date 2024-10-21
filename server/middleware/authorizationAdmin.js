const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authorizationAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if authorization header is provided
    if (!authHeader) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify and decode the token
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Check if the user exists in the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Check if the user has Admin privileges
    if (user.role === "Admin") {
      req.user = user; // Attach user to request
      return next(); // Proceed to the next middleware or route handler
    }

    // If the user is not an Admin
    return res.status(403).json({ error: "Forbidden: Admins only" });
    
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
      details: error.message,
    });
  }
};

module.exports = authorizationAdmin;
