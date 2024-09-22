const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/UserController");
const authorizationAdmin = require("../middleware/authorizationAdmin");
const authentication = require("../middleware/authentication");

userRouter.post("/login", UserController.login);
userRouter.post("/add-user", authentication, authorizationAdmin, UserController.addUser);

module.exports = userRouter;
