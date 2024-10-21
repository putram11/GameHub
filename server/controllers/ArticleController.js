const cloudinary = require("cloudinary").v2;
const { Article, User, Category } = require("../models");

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ArticleController {
  // Create a new article
  static async createArticle(req, res, next) {
    const { title, content, imgUrl, categoryId } = req.body;
    const { user } = req;

    try {
      const newArticle = await Article.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId: user.id,
      });
      res.status(201).json(newArticle);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "ValidationError"; // Adjusting error name for consistency
      }
      next(error);
    }
  }

  // Retrieve all articles
  static async getAllArticles(req, res, next) {
    try {
      const articles = await Article.findAll({
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: Category },
        ],
      });
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  // Retrieve article by ID
  static async getArticleById(req, res, next) {
    const { id } = req.params;

    try {
      const article = await Article.findByPk(id, {
        include: [
          { model: User, attributes: { exclude: ["password"] } },
          { model: Category },
        ],
      });

      if (!article) throw { name: "NotFoundError" };

      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

  // Update article details
  static async updateArticle(req, res, next) {
    const { id } = req.params;
    const { title, content, imgUrl, categoryId } = req.body;

    try {
      const article = await Article.findByPk(id);

      if (!article) throw { name: "NotFoundError" };

      await article.update({ title, content, imgUrl, categoryId });
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

  // Update article image
  static async updateArticleImage(req, res, next) {
    const { id } = req.params;

    try {
      const article = await Article.findByPk(id);

      if (!article) throw { name: "NotFoundError" };

      const file = req.file;
      if (!file) throw { name: "NoFileError", message: "No file provided" };

      // Convert file buffer to base64 and upload to Cloudinary
      const base64 = file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`
      );

      await article.update({ imgUrl: result.secure_url });
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

  // Delete an article by ID
  static async deleteArticle(req, res, next) {
    const { id } = req.params;

    try {
      const article = await Article.findByPk(id);

      if (!article) throw { name: "NotFoundError" };

      await article.destroy();
      res.status(200).json({ message: "Article successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ArticleController;
