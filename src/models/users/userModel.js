const mongoose = require("mongoose");
const deleteUserRanking = require("../../middlewares/deleteUserMiddleware");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true }, // Họ và tên người dùng
  username: { type: String, required: true, unique: true }, // Tên đăng nhập duy nhất
  password: { type: String, required: true }, // Mật khẩu (đã mã hóa)
  email: { type: String, required: true, unique: true }, // Email duy nhất
  gender: { type: String, enum: ["Male", "Female"], require: true}, // Giới tính
  role: { 
    type: String,
    enum: ["reader", "author"],
    default: "reader"
  }, // Vai trò: Độc giả, Tác giả
  idReaderExp: { type: mongoose.Schema.Types.ObjectId, ref: "ReaderExp" },
  avatar: { type: String, default: "https://via.placeholder.com/150" },// Ảnh đại diện (URL)
}, { timestamps: true, collection: "Users" });

// Áp dụng middleware khi User bị xóa
userSchema.pre("findOneAndDelete", deleteUserRanking);

module.exports = mongoose.model("User", userSchema);
