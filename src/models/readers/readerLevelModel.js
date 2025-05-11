const mongoose = require("mongoose");

const readerLevelSchema = new mongoose.Schema({ 
  level: { type: Number, required: true, unique: true }, 
  requiredExp: { type: Number, required: true }, 
  title: { type: String, required: true }, 
}, { timestamps: true, collection: "ReaderLevels" });

module.exports = mongoose.model("ReaderLevel", readerLevelSchema);
