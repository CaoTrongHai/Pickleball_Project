const express = require("express");
const {
  getlistCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../controller/category.js");

const categoryRouter = express.Router();
categoryRouter.get("/", getlistCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", updateCategory);

module.exports = categoryRouter;
