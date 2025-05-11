const mongoose = require("mongoose");

const readerExpSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người đọc
  totalExp: { type: Number, default: 0 }, // Tổng kinh nghiệm
  idLevel: { type: mongoose.Schema.Types.ObjectId, ref: "ReaderLevel" }
}, { timestamps: true, collection: "ReaderExps" });

module.exports = mongoose.model("ReaderExp", readerExpSchema);
