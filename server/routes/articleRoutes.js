const express = require("express");
const articleRouter = express.Router();
const ArticleController = require("../controllers/ArticleController");
const authorizationArticle = require("../middleware/authorizationArticle");
const upload = require("../middleware/multer");

articleRouter.get("/get", ArticleController.getAllArticles);
articleRouter.post("/add", ArticleController.createArticle);
articleRouter.get(
  "/:id",
  authorizationArticle,
  ArticleController.getArticleById
);
articleRouter.put(
  "/:id",
  authorizationArticle,
  ArticleController.updateArticle
);
articleRouter.patch(
  "/:id/image",
  upload.single("img"), 
  authorizationArticle, 
  ArticleController.updateArticleImage
);
articleRouter.delete(
  "/:id",
  authorizationArticle,
  ArticleController.deleteArticle
);

module.exports = articleRouter;
