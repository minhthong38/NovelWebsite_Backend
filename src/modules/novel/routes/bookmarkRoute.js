const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmarkController");

// Xử lý tạo Bookmark mới
router.post("/", bookmarkController.createBookmark);

// Xóa bookmark theo idChapter
router.delete("/chapter/:idChapter", bookmarkController.deleteBookmarkByChapter);

// Lấy bookmark theo idChapter
router.get("/chapter/:idChapter", bookmarkController.getBookmarkByChapter);

module.exports = router;
