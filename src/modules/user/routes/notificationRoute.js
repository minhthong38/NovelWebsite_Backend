const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Lấy tất cả thông báo của người dùng
router.get('/:userId', notificationController.getNotificationsByUser);

// Đánh dấu thông báo là đã đọc
router.put('/:id', notificationController.markAsRead);

// Tạo mới một thông báo
router.post('/', notificationController.createNotification);

// Xóa thông báo
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
