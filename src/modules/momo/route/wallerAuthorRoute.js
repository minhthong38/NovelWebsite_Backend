// routes/walletAuthor.route.js
const express = require('express');
const router = express.Router();
const walletController = require('../controller/walletAuthorController');
const { authMiddleware } = require('../../../middlewares/authMiddleware'); // Middleware kiểm tra token

// POST /api/wallet-author
router.post('/', walletController.createWallet);

// GET /api/wallet-author/:userId
router.get('/:userId', walletController.getWallet);

// PATCH /api/wallet-author/:userId/revenue
router.patch('/:userId/revenue', walletController.updateRevenue);

// Route xóa ví của người dùng
router.delete('/delete/:userId', authMiddleware, walletController.deleteWallet);

module.exports = router;
