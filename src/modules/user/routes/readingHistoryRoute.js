const express = require("express");
const router = express.Router();
const readingHistoryController = require("../controllers/readingHistoryController");

// Lấy toàn bộ lịch sử đọc của 1 user
router.get("/user/:userId", readingHistoryController.getHistoryByUser);

// Tạo hoặc cập nhật lịch sử đọc
router.post("/", readingHistoryController.createOrUpdateHistory);

// Xóa lịch sử đọc theo id
router.delete('/user/:userId', readingHistoryController.deleteAllReadingHistory);

module.exports = router;
