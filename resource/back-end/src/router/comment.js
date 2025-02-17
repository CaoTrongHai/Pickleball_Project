const express = require("express");
const { getListComment } = require("../controller/comment.js");

const commentRouter = express.Router();
commentRouter.get("/", getListComment);
module.exports = commentRouter;
