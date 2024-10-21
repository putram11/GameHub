const { Op } = require("sequelize");
const { Article, User, Category } = require("../models");

class PublicController {
  // Fetch all articles with search, sort, category filter, and pagination
  static async getAllArticles(req, res, next) {
    try {
      const { search, sort = "DESC", category, page = 1 } = req.query;
      const limit = 10;
      const offset = (page - 1) * limit;

      // Build the where clause for search functionality
      const whereClause = search ? { title: { [Op.like]: `%${search}%` } } : {};

      // Build the where clause for category filtering
      const categoryClause = category ? { name: category } : {};

      const articles = await Article.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
            where: categoryClause, // Filter by category if provided
          },
        ],
        where: whereClause,
        order: [["createdAt", sort.toUpperCase()]], // Sort based on query param (default: DESC)
        limit,
        offset,
      });

      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  // Fetch all articles without any filters
  static async allArticles(req, res, next) {
    try {
      const articles = await Article.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        order: [["createdAt", "DESC"]], // Default sort order: most recent articles first
      });

      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

  // Fetch a specific article by ID
  static async getArticleById(req, res, next) {
    try {
      const { id } = req.params;

      const article = await Article.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        attributes: { exclude: ["password"] }, // Exclude password from user attributes
      });

      if (!article) {
        throw { name: "NotFoundError", message: "Article not found" };
      }

      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicController;
