const express = require("express");
const router = express.Router();
const userRouter = require("./userRoutes");
const pubRouter = require("./publicRoutes");
const categoryRouter = require("./categoryRoutes");
const articleRouter = require("./articleRoutes");

const authentication = require("../middleware/authentication");

//! ENDPOINT ALL ROUTER

router.use("/user", userRouter);
router.use("/pub", pubRouter);
router.use("/categories", authentication, categoryRouter);
router.use("/articles", authentication, articleRouter);

module.exports = router;
