const express = require("express");
const {
  register,
  login,
  getListUser,
  getUserById,
  deleteUser,
} = require("../controller/user.js");

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getListUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
