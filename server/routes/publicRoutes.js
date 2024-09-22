const express = require("express");
const pubRouter = express.Router();
const PublicController = require("../controllers/PublicController");
const CategoryController = require("../controllers/CategoryController");

// Routes for public site
pubRouter.get("/articles", PublicController.getAllArticles);
pubRouter.get("/arti", PublicController.allArticles);
pubRouter.get("/articles/:id", PublicController.getArticleById);
pubRouter.get("/categories", CategoryController.getAllCategories);

module.exports = pubRouter;
