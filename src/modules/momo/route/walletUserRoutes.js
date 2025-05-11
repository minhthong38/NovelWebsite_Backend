const express = require('express');
const router = express.Router();
const WalletUserController = require('../controller/walletUserController')
const { authMiddleware } = require('../../../middlewares/authMiddleware'); // Middleware kiểm tra token

// Route tạo ví cho người dùng mới
router.post('/create/:userId', WalletUserController.createWallet);

// Route lấy thông tin ví của người dùng
router.get('/:userId', WalletUserController.getWallet);

// Route cập nhật số dư ví của người dùng
router.put('/update/:userId', authMiddleware, WalletUserController.updateWallet);

// Route xóa ví của người dùng
router.delete('/delete/:userId', authMiddleware, WalletUserController.deleteWallet);

module.exports = router;

