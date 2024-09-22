const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const { Article, User, Category } = require("../models");

class ArticleController {
  static async createArticle(req, res, next) {
    const { title, content, imgUrl, categoryId } = req.body;
    const { user } = req;

    try {
      const article = await Article.create({
        title,
        content,
        imgUrl,
        categoryId,
        authorId: user.id,
      });
      res.status(201).json(article);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "ValidationError";
        next(error);
      } else {
        next(error);
      }
    }
  }

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

  static async updateArticleImage(req, res, next) {
    const { id } = req.params;
    try {
      const article = await Article.findByPk(id);

      const file = req.file;
      const base64 = file.buffer.toString("base64");

      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};${base64}`
      );
      res.json(result);

      await article.update({ imgUrl: result.secure_url });
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }

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
