const mongoose = require("mongoose");

const novelSchema = new mongoose.Schema({ 
  idCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }], // Thể loại tiểu thuyết
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tác giả của tiểu thuyết
  title: { type: String, required: true, trim: true }, // Tiêu đề tiểu thuyết
  description: { type: String, required: true }, // Mô tả nội dung
  view: { type: Number, default: 0 }, // Số lượt xem
  imageUrl: { type: String, required: true }, // Ảnh bìa của tiểu thuyết
  rate: { type: Number, default: 0 }, // Đánh giá trung bình
  status: { type: String, enum: ["ongoing", "completed"], default: "ongoing" } // Trạng thái (Đang cập nhật / Hoàn thành)
}, { timestamps: true, collection: "Novels" });

module.exports = mongoose.model("Novel", novelSchema);
