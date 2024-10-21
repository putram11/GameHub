const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jsonwebtoken");

class UserController {
  // Add a new user to the system
  static async addUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      // Validate input fields
      if (!email || !password) {
        throw { name: "InvalidInput", message: "Email and password are required." };
      }

      // Create a new user in the database
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });

      // Exclude password from the response
      const { password: _, ...userData } = user.toJSON();

      res.status(201).json(userData);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // User login handler
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Validate input fields
      if (!email || !password) {
        throw { name: "InvalidInput", message: "Email and password are required." };
      }

      // Find user by email
      const user = await User.findOne({ where: { email } });

      // If user is not found, throw an error
      if (!user) {
        throw { name: "InvalidInput", message: "Invalid email or password." };
      }

      // Validate password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "InvalidInput", message: "Invalid email or password." };
      }

      // Generate token for the authenticated user
      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({ access_token: token, id: user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

module.exports = UserController;
