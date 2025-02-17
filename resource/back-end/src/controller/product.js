const { Schema } = require("mongoose");
const Product = require("../model/product.js");

const getListProduct = async (req, res) => {
  try {
    const listProduct = await Product.find()
      .populate("comments")
      .populate("category");
    return res
      .status(200)
      .json({ message: "get List Product successfully", data: listProduct });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = {getListProduct};
