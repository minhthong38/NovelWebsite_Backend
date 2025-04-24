const mongoose = require("mongoose");

const authorRankingSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tham chiếu đến User
  viewTotal: { type: Number, default: 0 }, // Tổng số lượt xem của author
}, { timestamps: true, collection: "AuthorRankings" });

module.exports = mongoose.model("AuthorRanking", authorRankingSchema);
