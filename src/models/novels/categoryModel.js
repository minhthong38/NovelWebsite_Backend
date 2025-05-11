const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  titleCategory: { type: String, required: true, unique: true }, // Tên danh mục (vd: "Fantasy", "Sci-Fi")
  description: { type: String, required: true } // Mô tả danh mục
}, { timestamps: true, collection: "Categories"});

module.exports = mongoose.model("Category", categorySchema);
