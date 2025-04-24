const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");

// Xử lý tạo nếu chưa có, và xóa nếu có rồi
router.post("/", bookmarkController.toggleBookmark);

module.exports = router;
