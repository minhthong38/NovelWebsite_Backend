const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema(
  {
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    idChapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
  },
  { timestamps: true, collection: "Bookmarks" }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
