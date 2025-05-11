const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  idNovel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel", required: true }, // Liên kết với tiểu thuyết
  title: { type: String, required: true }, // Tiêu đề chương
  order: { type: Number, required: true }, // Số thứ tự chương
  role: { type: String, enum: ["vip", "normal"], default: "normal" }, // Loại chương (VIP hoặc miễn phí)
  price: { type: Number, default: 0 }, // Giá chương (chỉ áp dụng nếu là VIP)
  imageUrl: { type: String }, // Ảnh banner của chương
  view: { type: Number, default: 0 }, // Lượt xem chương
  content: { type: String, required: true }, // Nội dung chương
}, { timestamps: true, collection: "Chapters" });

module.exports = mongoose.model("Chapter", chapterSchema);
