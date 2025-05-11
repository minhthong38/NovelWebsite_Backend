const mongoose = require("mongoose");

const authorExpSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  totalExp: { type: Number, default: 0 },
  idLevel: { type: mongoose.Schema.Types.ObjectId, ref: "AuthorLevel", required: true }
}, { timestamps: true, collection: "AuthorExps" });

module.exports = mongoose.model("AuthorExp", authorExpSchema);
