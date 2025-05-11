const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Tên đăng nhập (duy nhất)
  password: { type: String, required: true }, // Mật khẩu đã được hash
  email: { type: String, required: true, unique: true }, // Email (duy nhất)
  gender: { type: String, enum: ["Male", "Female"], required: true }, // Giới tính
  role: { type: String, default: "Admin"}
}, { timestamps: true, collection: "Admins" });

module.exports = mongoose.model("Admin", adminSchema);
