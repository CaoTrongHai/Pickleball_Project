const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  weight: { type: Number },
  material: { type: String },
  images: [
    {
      _id: mongoose.Schema.Types.ObjectId, // Lưu ObjectId nhưng vẫn giữ thông tin khác
      url: { type: String, required: true },
      caption: { type: String, required: true },
    },
  ],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});
// kích hoạt phân trang
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
