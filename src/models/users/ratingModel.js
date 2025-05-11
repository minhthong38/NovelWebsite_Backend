const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người dùng đánh giá
    idNovel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel", required: true }, // Tiểu thuyết được đánh giá
    rating: { type: Number, required: true, min: 1, max: 5 }, // Điểm đánh giá (1 đến 5 sao)
  }, { timestamps: true, collection: "Ratings" });
  
  module.exports = mongoose.model("Rating", ratingSchema);
  