const express = require('express');
const router = express.Router();
const momoController = require('../controller/momoController');

// Tạo payment
router.post('/create-payment', momoController.createPayment);

// Nhận IPN callback từ MoMo
router.post('/ipn', momoController.handleIpn);

module.exports = router;
