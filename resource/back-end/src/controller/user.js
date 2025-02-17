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

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = ({ username, avatar, address, phoneNumber } = req.body);
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "User Id does not exist " });
  }
  const updateUser = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  return res
    .status(200)
    .json({ message: "Update user successfully", data: updateUser });
};

// Send OTP
// Gửi OTP khi quên mật khẩu
const { sendOTP } = require("../utils/nodemailer.js");
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // kiểm tra email tồn tại trong cơ sở dữ liệu k
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email incorrect" });
  }
  // tạo otp ngẫu nhiên
  const otp = Math.floor(100000 + Math.random() * 900000);
  // Lưu OTP vào cơ sở dữ liệu với thời gian hết hạn (ví dụ: 10 phút)
  const otpExpiration = new Date();
  otpExpiration.setMinutes(otpExpiration.getMinutes() + 10); // OTP hết hạn sau 10 phút

  user.otp = otp;
  user.otpExpired = otpExpiration;
  await user.save();

  // gửi otp đến email người dùng
  await sendOTP(email, otp);

  res
    .status(200)
    .json({ message: "OTP send your email . Check email please " });
};

// Xác thực OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Kiểm tra email tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }
    if (user.otp != otp) {
      return res.status(400).json({ message: "OTP không đúng" });
    }
    // Kiểm tra xem OTP có hết hạn không
    if (new Date() > user.otpExpiration) {
      return res.status(400).json({ message: "Mã OTP đã hết hạn" });
    }
    res
      .status(200)
      .json({ message: "OTP hợp lệ, bạn có thể thay đổi mật khẩu" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Kiểm tra OTP
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email không tồn tại" });
  }

  // Kiểm tra xem OTP có khớp không
  if (user.otp !== otp) {
    return res.status(400).json({ message: "Mã OTP không đúng" });
  }

  // Kiểm tra xem OTP có hết hạn không
  if (new Date() > user.otpExpiration) {
    return res.status(400).json({ message: "Mã OTP đã hết hạn" });
  }

  const hashPassword = await bcrypt.hash(
    newPassword,
    parseInt(process.env.SALT_TOKEN)
  );
  // Cập nhật mật khẩu mới
  user.password = hashPassword;
  user.otp = undefined;
  user.otpExpired = undefined;
  await user.save();

  res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
};

module.exports = {
  register,
  login,
  getListUser,
  getUserById,
  deleteUser,
  updateUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
