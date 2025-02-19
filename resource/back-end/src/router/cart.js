const express = require("express");
const {
  getCartByUserId,
  addCart,
  updateCart,
} = require("../controller/cart.js");

const cartRouter = express.Router();
cartRouter.get("/:userId", getCartByUserId);
cartRouter.post("/:userId/add", addCart);
cartRouter.put("/:userId/update", updateCart);

module.exports = cartRouter;
