const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authorizationAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (user.role === "Admin") {
      req.user = user; // Attach user to request
      return next();
    }

    return res.status(403).json({ error: "Forbidden: Admins only" });
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Invalid token", details: error.message });
      
  }
};

module.exports = authorizationAdmin;
