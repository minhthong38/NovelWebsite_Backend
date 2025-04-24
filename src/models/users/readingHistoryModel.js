const mongoose = require("mongoose");

const readingHistorySchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  idNovel: { type: mongoose.Schema.Types.ObjectId, ref: "Novel", required: true },
  idChapter: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
  lastReadAt: { type: Date, default: Date.now }
}, { collection: "ReadingHistories" });

module.exports = mongoose.model("ReadingHistory", readingHistorySchema);
