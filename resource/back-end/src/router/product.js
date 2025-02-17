const express = require("express");
const { getListProduct } = require("../controller/product.js");

const productRouter = express.Router();
productRouter.get("/", getListProduct);
module.exports = productRouter;
