const Cart = require("../model/cart.js");
const Product = require("../model/product.js");
const User = require("../model/user.js");
// lấy giỏ hàng của user
const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    // const cart = await Cart.findOne({ userId }).populate("items.productId");
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart is not exist" });
    }
    return res
      .status(500)
      .json({ message: "get Cart By User Id successfully", data: cart });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

// thêm sản phẩm vào giỏ hàng
const addCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;
    // kiểm tra quantity
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    // kiểm tra userId tồn tại trong db k
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // kiểm tra xem sản phẩm có tồn tại k
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // tìm giỏ hàng của user
    let cart = await Cart.findOne({ userId });

    // nếu chưa có giỏ hàng , tạo mới
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // kiểm tra nếu sản phẩm đã có trong giỏ hàng
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    const qty = parseInt(quantity, 10);
    if (existingItem) {
      // nếu tồn tại , cập nhật số lượng
      existingItem.quantity += qty;
      existingItem.price = existingItem.quantity * product.price;
    } else {
      // nếu chưa có thêm mới
      cart.items.push({ productId, quantity, price: quantity * product.price });
    }

    await cart.save();
    return res
      .status(200)
      .json({ message: "Add to cart successfully", data: cart });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

// cập nhật số lượng trong giỏ hàng
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;

    // kiểm tra userId tồn tại
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // kiểm tra sản phẩm tồn tại
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // tìm giỏ hàng của user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart does not exist" });
    }

    // tìm sản phẩm trong giỏ hàng
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    // cập nhật số lượng và giá
    const qty = parseInt(quantity, 10);
    if (qty <= 0) {
      // xóa sản phẩm nếu số lượng <=0
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      existingItem.quantity = qty;
      existingItem.price = qty * product.price;
    }

    await cart.save();
    return res
      .status(200)
      .json({ message: "Cart updated successfully", data: cart });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    // Kiểm tra user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm giỏ hàng của user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart does not exist" });
    }

    // Tìm sản phẩm trong giỏ hàng
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    cart.items.splice(existingItemIndex, 1);
    await cart.save();

    return res
      .status(200)
      .json({ message: "Product removed from cart successfully", data: cart });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};
const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Kiểm tra user có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm giỏ hàng của user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart does not exist" });
    }

    // Xóa toàn bộ sản phẩm khỏi giỏ hàng
    cart.items = [];
    await cart.save();

    return res
      .status(200)
      .json({ message: "Cart cleared successfully", data: cart });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};
module.exports = {
  getCartByUserId,
  addCart,
  updateCart,
  removeCartItem,
  clearCart,
};
