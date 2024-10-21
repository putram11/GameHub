const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT;

const generateToken = (payload) => jwt.sign(payload, secretKey);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const decodeToken = (token) => jwt.decode(token);

module.exports = {
  generateToken,
  verifyToken,
  decodeToken,
};
