const express = require("express");
const {
  getListProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/product.js");

const productRouter = express.Router();
productRouter.get("/", getListProduct);
productRouter.get("/:id", getProductById);
productRouter.post("/", createProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);

module.exports = productRouter;
