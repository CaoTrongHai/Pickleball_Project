const { Schema } = require("mongoose");
const Product = require("../model/product.js");
const Category = require("../model/category.js");

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

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productById = await Product.findById(productId)
      .populate("comments")
      .populate("category");
    return res
      .status(200)
      .json({ message: "get product by Id successfully", data: productById });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, weight, material, images, category } =
      req.body;
    // kiem tra category ton tai trong dtb k
    const validCategory = await Category.findById(category);
    if (!validCategory) {
      return res
        .status(400)
        .json({ message: "Category is not exist or inValid" });
    }
    const newProduct = new Product({
      name,
      description,
      price,
      weight,
      material,
      images,
      category,
    });

    // Lưu vào database
    await newProduct.save();
    return res
      .status(200)
      .json({ message: "Create Product successfully", data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const productById = await Product.findById(productId);
    if (!productById) {
      return res
        .status(400)
        .json({ message: "Id Product delete is not exist" });
    }
    const productDelete = await Product.findByIdAndDelete(productId);
    return res
      .status(200)
      .json({ message: "delete product successfully", data: productDelete });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
     const { category, ...updateData } = req.body;

     // Kiểm tra xem category có tồn tại trong collection Category hay không
     if (category) {
       const categoryExists = await Category.findById(category);
       if (!categoryExists) {
         return res.status(400).json({ message: "Category does not exist" });
       }
     }
    const productById = await Product.findById(productId);
    if (!productById) {
      return res.status(400).json({ message: "Product ID is not exist" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true } // Trả về dữ liệu mới và kiểm tra validation
    );

    return res.status(200).json({
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = {
  getListProduct,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};
