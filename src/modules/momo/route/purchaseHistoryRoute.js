const express = require('express');
const router = express.Router();
const purchaseHistoryController = require('../controller/purchaseHistoryController');

// POST /api/purchaseHistory
router.post('/', purchaseHistoryController.create);

// GET /api/purchaseHistory/user/:userId
router.get('/user/:userId', purchaseHistoryController.getUserPurchases);

// GET /api/purchaseHistory/check?userId=xxx&chapterId=yyy
router.get('/check', purchaseHistoryController.checkPurchased);

// GET /api/purchaseHistories/novel/:novelId/stats
router.get('/novel/:novelId/stats', purchaseHistoryController.getNovelStats);

module.exports = router;
