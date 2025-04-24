require("dotenv").config(); // Load biến môi trường
require("./cron-job/rankingCronJob");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config/env");
const connectDB = require("./config/database");


// Kết nối MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Import routes từ các module
const readerExpRoutes = require("./modules/reader/routes/readerExpRoute");
const readerRankingRoutes = require("./modules/reader/routes/readerRankingRoute");
const readerLevelRoutes = require("./modules/reader/routes/readerLevelRoute");
const authorLevelRoutes = require("./modules/author/routes/authorLevelRoute");
const authorExpRoutes = require("./modules/author/routes/authorExpRoute");
const authorRankingRoutes = require("./modules/author/routes/authorRankingRoute");
const authorTaskRoutes = require("./modules/author/routes/authorTaskRoute");
const taskRoutes = require("./modules/author/routes/taskRoute");
const userRoutes = require("./modules/user/routes/userRoute");
const commentRoutes = require("./modules/user/routes/commentRoute");
const readingHistoryRoutes = require("./modules/user/routes/readingHistoryRoute");
const favoriteRoutes = require("./modules/user/routes/favoriteNovelRoute");
const CategoryRoutes = require("./modules/novel/routes/categoryRoute");
const adminRoutes = require("./modules/admin/routes/adminRoute");
const novelRoutes = require("./modules/novel/routes/novelRoute");
const novelRankings = require("./modules/novel/routes/novelRankingRoute");
const chapterRoutes = require("./modules/novel/routes/chapterRoute");
const bookmarkRoutes = require("./modules/novel/routes/bookmarkRoute");

// Định nghĩa route động
app.use("/api/readerExps", readerExpRoutes);
app.use("/api/readerRankings", readerRankingRoutes);
app.use("/api/readerLevels", readerLevelRoutes);
app.use("/api/authorLevels", authorLevelRoutes);
app.use("/api/authorExps", authorExpRoutes);
app.use("/api/authorRankings", authorRankingRoutes);
app.use("/api/authorTasks", authorTaskRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/readingHistories", readingHistoryRoutes);
app.use("/api/favoriteNovels", favoriteRoutes);
app.use("/api/categories", CategoryRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/novels", novelRoutes);
app.use("/api/novelRankings", novelRankings);
app.use("/api/chapters", chapterRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

// Xử lý lỗi 404 (Không tìm thấy route)
app.use((req, res) => {
  res.status(404).json({ message: "Route không tồn tại" });
});

// Khởi động server
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng : ${PORT}`);
});
