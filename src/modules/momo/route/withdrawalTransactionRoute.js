const express = require('express');
const router = express.Router();
const withdrawalController = require('../controller/withdrawalTransactionController');
const { authMiddleware } = require('../../../middlewares/authMiddleware');

// Route rút tiền ngay lập tức
router.post('/', authMiddleware, withdrawalController.withdrawImmediately);

// Route xem danh sách các yêu cầu rút tiền
router.get('/me', authMiddleware, withdrawalController.getUserWithdrawals);

module.exports = router;
