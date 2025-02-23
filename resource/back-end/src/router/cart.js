const express = require("express");
const {
  getCartByUserId,
  addCart,
  updateCart,
  removeCartItem,
  clearCart,
} = require("../controller/cart.js");

const cartRouter = express.Router();
cartRouter.get("/:userId", getCartByUserId);
cartRouter.post("/:userId/add", addCart);
cartRouter.put("/:userId/update", updateCart);
cartRouter.delete("/:userId/remove/:productId", removeCartItem);
cartRouter.delete("/:userId/clear", clearCart);

module.exports = cartRouter;
