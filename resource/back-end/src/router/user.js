const express = require("express");
const {
  register,
  login,
  getListUser,
  getUserById,
  deleteUser,
  updateUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controller/user.js");

const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/", getListUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);
userRouter.post("/forgotPassword", forgotPassword); // Gửi OTP
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/resetPassword", resetPassword);

module.exports = userRouter;
