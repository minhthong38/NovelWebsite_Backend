// routes/rating.js
const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/RatingController');

// POST request để gửi đánh giá từ người dùng
router.post('/', RatingController.addRating);

// Lấy tất cả đánh giá của một truyện cụ thể
router.get('/novel/:novelId', RatingController.getRatingsByNovel);

// Lấy đánh giá của user dựa trên idNovel
router.get('/novel/:novelId/user/:userId', RatingController.getRatingByUserAndNovel);

// Xóa đánh giá của user trên novel
router.delete('/novel/:novelId/user/:userId', RatingController.deleteRating);

module.exports = router;
