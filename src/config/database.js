const mongoose = require("mongoose");
const config = require("./env");

const connectDB = async () => {
  try {
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is missing in environment variables!");
    }
    
    await mongoose.connect(config.MONGO_URI); // Xóa các tùy chọn không cần thiết
    console.log("Kết Nối MongDB Thành Công");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
