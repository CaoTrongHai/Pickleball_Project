const express = require("express");
const categoryRouter = require("../router/category.js");
const userRouter = require("../router/user.js");
const commentRouter = require("../router/comment.js");
const productRouter = require("../router/product.js");

const router = express.Router();
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
router.use("/comments", commentRouter);
router.use("/products", productRouter);
module.exports = router;
