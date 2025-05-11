const mongoose = require("mongoose");

const readerRankingSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người đọc
  idReaderExp: { type: mongoose.Schema.Types.ObjectId, ref: "ReaderExp", required: true } // Tổng kinh nghiệm để xếp hạng
}, { timestamps: true, collection: "ReaderRankings" });

module.exports = mongoose.model("ReaderRanking", readerRankingSchema);
