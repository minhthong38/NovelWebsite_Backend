// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');

// Tạo giao dịch và số coin nhận được
router.post('/create-transaction', transactionController.createTransaction);

// Lấy lịch sử giao dịch của người dùng
router.get('/:userId', transactionController.getUserTransactions);

// Lấy lịch sử giao dịch của tất cả người dùng
router.get('/', transactionController.getAllTransactions);

// cập nhật trạng thái giao dịch
router.put('/update-transaction',transactionController.updateStatusTransactions)

module.exports = router;
