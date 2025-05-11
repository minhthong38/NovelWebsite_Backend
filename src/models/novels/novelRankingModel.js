const mongoose = require("mongoose");

const novelRankingSchema = new mongoose.Schema({
  idNovel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel", required: true }, // Liên kết với tiểu thuyết
  viewTotal: { type: Number, default: 0 } // Tổng số lượt xem để xếp hạng
}, { timestamps: true, collection: "NovelRankings" });

module.exports = mongoose.model("NovelRanking", novelRankingSchema);
