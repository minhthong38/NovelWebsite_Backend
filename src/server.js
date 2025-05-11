require("dotenv").config(); // Load biến môi trường

// import Cron job
require("./cron-job/rankingCronJob");
require('./cron-job/updateViewsJob');
require('./cron-job/novelViewCron');

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
const ratingRoutes = require("./modules/user/routes/ratingRoute");
const authorRegisterRoutes = require("./modules/author/routes/authorRegisterRoute");
const uploadRoutes = require("./modules/novel/routes/upload");

const paymentRoutes = require("./modules/momo/route/momoRoute"); //momo
const transactionRoutes = require("./modules/momo/route/transactionRoute");
const walletUserRoutes = require("./modules/momo/route/walletUserRoutes");
const walletAuthorRoutes = require("./modules/momo/route/wallerAuthorRoute");
const purchaseRoutes = require("./modules/momo/route/purchaseRoute"); //momo
const purchaseHistoryRoutes = require("./modules/momo/route/purchaseHistoryRoute");
const withdrawalTransactionRoutes = require("./modules/momo/route/withdrawalTransactionRoute"); //rút tiền

//Thông báo
const notificationRoutes = require("./modules/user/routes/notificationRoute");

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
app.use("/api/ratings", ratingRoutes);
app.use("/api/authorRegisters", authorRegisterRoutes);
app.use('/api/uploads', uploadRoutes);

app.use("/api/payments", paymentRoutes); //momo
app.use("/api/transactions", transactionRoutes);
app.use("/api/wallets", walletUserRoutes); //walletUser
app.use("/api/walletAuthors", walletAuthorRoutes); //walletAuthor
app.use("/api/purchaseChapters", purchaseRoutes);
app.use("/api/purchaseHistories", purchaseHistoryRoutes);
app.use("/api/withdrawalTransactions", withdrawalTransactionRoutes); //rút tiền

//Thông báo
app.use("/api/notifications", notificationRoutes);

// Xử lý lỗi 404 (Không tìm thấy route)
app.use((req, res) => {
  res.status(404).json({ message: "Route không tồn tại" });
});

// Khởi động server
const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng : ${PORT}`);
});

