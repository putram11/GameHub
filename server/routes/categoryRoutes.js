const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authorizationAdmin = require("../middleware/authorizationAdmin");

categoryRouter.post(
  "/add",
  authorizationAdmin,
  CategoryController.createCategory
);
categoryRouter.get(
  "/all",
  authorizationAdmin,
  CategoryController.getAllCategories
);
categoryRouter.put(
  "/:id/edit",
  authorizationAdmin,
  CategoryController.updateCategory
);
categoryRouter.delete(
  "/:id/delete",
  authorizationAdmin,
  CategoryController.deleteCategory
);

module.exports = categoryRouter;
