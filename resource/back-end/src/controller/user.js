const User = require("../model/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// đăng ký
const register = async (req, res) => {
  try {
    const { username, email, password, address, phoneNumber } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username can not Empty" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email can not Empty" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password can not be Empty" });
    }
    if (username.length <= 5) {
      return res
        .status(400)
        .json({ message: "Username must be greater than 5 character" });
    }
    if (password.length <= 8) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 8 character" });
    }
    // trùng email
    const existedUser = await User.findOne({ email }).exec();
    if (existedUser != null) {
      throw new Error("User is existed!!!");
    }
    // chua co
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_TOKEN)
    );
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
      address,
      phoneNumber,
    });
    const userData = {
      ...newUser._doc,
      password: "not show",
    };
    return res.status(201).json({
      message: "Register is successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// đăng nhập
const login = async (req, res) => {
  try {
    // dang nhap la email va password
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email can not empty" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password can not empty" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    }
    // sinh ra token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const userData = {
      ...user._doc,
      password: "not show",
    };
    return res.json({ token, user: userData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getListUser = async (req, res) => {
  try {
    const listUser = await User.find();
    if (!listUser) {
      return res.status(404).json({ message: "Not found User" });
    }
    return res.status(200).json(listUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userbyId = await User.findById(userId);
    if (!userbyId) {
      return res.status(400).json({ message: "User Id is not exist" });
    }
    return res
      .status(200)
      .json({ message: "get User by Id successfully", data: userbyId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userById = await User.findById(userId);
    if (!userById) {
      return res.status(400).json({ message: "User ID is not exist!" });
    }
    const deleteUser = await User.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ message: "Delete User successfully", data: deleteUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { register, login, getListUser, getUserById, deleteUser };
