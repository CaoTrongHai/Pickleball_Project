const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const isEmail = require("validator/lib/isEmail.js");

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: "Email is incorrect",
      },
    },

    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar: { type: String, default: "/images/default-avatar.jpg" },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
