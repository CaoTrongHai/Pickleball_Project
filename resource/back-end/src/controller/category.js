const Category = require("../model/category.js");

const getlistCategory = async (req, res) => {
  try {
    const listCategory = await Category.find();
    if (listCategory.length === 0) {
      return res.status(404).json({ message: "Not found list Category" });
    }
    return res.status(200).json({
      message: "Get list Category successfully",
      data: listCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryById = await Category.findById(categoryId);
    if (!categoryById) {
      return res.status(404).json({ message: "Category Id is not exist!" });
    }
    return res.status(200).json({
      message: "Get Category by Id successfully!",
      data: categoryById,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const newCategory = await Category.create({
      name,
      description,
      image,
    });
    return res
      .status(201)
      .json({ message: "Create category successfully", data: newCategory });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryById = await Category.findById(categoryId);
    if (!categoryById) {
      return res.status(400).json({ message: "Category Id is not exist" });
    }
    const deleteCategory = await Category.findByIdAndDelete(categoryId);
    return res
      .status(200)
      .json({ message: "delete Category successfully", data: deleteCategory });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category ID does not exist!" });
    }

  
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true, runValidators: true } // Trả về dữ liệu mới và kiểm tra validation
    );

    return res.status(200).json({
      message: "Category updated successfully!",
      data: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = { updateCategory };


module.exports = {
  getlistCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory
};
