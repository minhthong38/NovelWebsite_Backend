const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true }, // Tên nhiệm vụ
  description: { type: String, required: true }, // Mô tả nhiệm vụ
  order: { type: Number, required: true }, // Thứ tự nhiệm vụ
  expPoint: { type: Number, required: true } // Điểm kinh nghiệm nhận được khi hoàn thành
}, { timestamps: true, collection: "Tasks" });

module.exports = mongoose.model("Task", taskSchema);
