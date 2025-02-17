const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Product = require("../model/product.js");
const User = require("../model/user.js");
const commentSchema = new Schema(
  {
    content: { type: String },
    rating: { type: Number },
    product: { type: mongoose.Schema.ObjectId, ref: "Product" },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
