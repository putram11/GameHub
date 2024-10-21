const { verifyToken } = require("../helpers/jsonwebtoken");
const { User } = require("../models");

const authentication = async (req, res, next) => {
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

    // Check if the user exists in the database
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach the user to the request object and proceed
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ 
      error: "Invalid token", 
      details: error.message 
    });
  }
};

module.exports = authentication;
