const express = require("express");
const categoryRouter = require("../router/category.js");
const userRouter = require("../router/user.js");

const router = express.Router();
router.use("/categories", categoryRouter);
router.use("/users", userRouter);
module.exports = router;
