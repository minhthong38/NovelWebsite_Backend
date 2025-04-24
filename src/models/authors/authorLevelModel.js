const mongoose = require("mongoose");

const authorLevelSchema = new mongoose.Schema({ 
  level: { type: Number, required: true, unique: true }, 
  requiredExp: { type: Number, required: true }, 
  title: { type: String, required: true }, 
}, { timestamps: true, collection: "AuthorLevels" });

module.exports = mongoose.model("AuthorLevel", authorLevelSchema);
