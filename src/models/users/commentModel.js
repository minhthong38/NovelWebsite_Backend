const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người bình luận
  idNovel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel", required: true }, // Tiểu thuyết được bình luận
  content: { type: String, required: true }, // Nội dung bình luận
}, { timestamps: true, collection: "Comments" });

module.exports = mongoose.model("Comment", commentSchema);
