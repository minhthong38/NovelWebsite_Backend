const mongoose = require("mongoose");

const favoriteNovelSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  idNovel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel", required: true },
}, { timestamps: true, collection: "FavoriteNovels" });

module.exports = mongoose.model("FavoriteNovel", favoriteNovelSchema);
