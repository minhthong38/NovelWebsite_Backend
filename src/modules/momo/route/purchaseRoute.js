const express = require('express');
const router = express.Router();
const purchaseController = require('../controller/purchaseController');
const { authMiddleware } = require('../../../middlewares/authMiddleware');

// Tạo purchase
router.post('/purchase',authMiddleware, purchaseController.buyChapter);

module.exports = router;
