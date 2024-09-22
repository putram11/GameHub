const { Category } = require("../models");

class CategoryController {
  static async createCategory(req, res, next) {
    const { name } = req.body;

    try {
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "ValidationError";
        next(error);
      } else {
        next(error);
      }
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const category = await Category.findByPk(id);

      if (!category) throw { name: "NotFoundError" };

      await category.update({ name });
      res.status(200).json(category);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        error.name = "ValidationError";
        next(error);
      } else {
        next(error);
      }
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);

      if (!category) throw { name: "NotFoundError" };

      await category.destroy();
      res.status(200).json({ message: "Category successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryController;
