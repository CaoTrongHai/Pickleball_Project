const Comment = require("../model/comment.js");

const getListComment = async (req, res) => {
  try {
    const listComment = await Comment.find()
      .populate("product")
      .populate("user");
    const formatComment = listComment.map((com) => ({
      _id: com._id,
      content: com.content,
      rating: com.rating,
      productName: com.product.name,
      userComment: com.user.username,
    }));
    if (!formatComment) {
      return res.status(400).json({ message: "Not found list Comment" });
    }
    return res
      .status(200)
      .json({ message: "get list Comment successfully", data: formatComment });
  } catch (error) {
    return res.status(500).json({ message: error.toString() });
  }
};

module.exports = { getListComment };
