const mongoose = require("mongoose");

const authorTaskSchema = new mongoose.Schema({
  idAuthorExp: { type: mongoose.Schema.Types.ObjectId, ref: "AuthorExp", required: true }, // Tham chiếu đến Author Exp
  idTask: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true }, // Tham chiếu đến Task
  expEarned: { type: Number }, // Điểm kinh nghiệm kiếm được từ task
  status: { type: String, enum: ["pending", "completed"], default: "pending" }, // Trạng thái nhiệm vụ
}, { timestamps: true, collection: "AuthorTasks" });

module.exports = mongoose.model("AuthorTask", authorTaskSchema);
