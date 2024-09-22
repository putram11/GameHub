const { Op } = require("sequelize");
const { Article, User, Category } = require("../models");

class PublicController {
  static async getAllArticles(req, res, next) {
    try {
      const { search, sort = "DESC", category, page = 1 } = req.query;
      const limit = 10;
      const offset = (page - 1) * limit;

      const whereClause = {};
      if (search) {
        whereClause.title = {
          [Op.like]: `%${search}%`,
        };
      }

      const listCategory = {};
      if (category) {
        listCategory.name = category;
      }

      const articles = await Article.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
            where: listCategory,
          },
        ],
        where: whereClause,
        order: [["createdAt", sort.toUpperCase()]],
        limit,
        offset,
      });
      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }
  static async allArticles(req, res, next) {
    try {
      // Fetch all articles without pagination, search, or category filter
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
        order: [["createdAt", "DESC"]], // Default sorting, you can change if needed
      });

      res.status(200).json(articles);
    } catch (error) {
      next(error);
    }
  }

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
        attributes: { exclude: ["password"] },
      });

      if (!article) throw { name: "NotFoundError" };
      res.status(200).json(article);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PublicController;
