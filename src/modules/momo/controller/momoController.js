const momoService = require('../service/momoService');

exports.createPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const deeplink = await momoService.createMomoPayment(amount); // Tạo payment qua Service
    res.json({ deeplink }); // Trả về deeplink hoặc payUrl từ MoMo
  } catch (error) {
    console.error(error);
    res.status(500).send('Payment error');
  }
};

// controllers/momoController.js
exports.handleIpn = async (req, res) => {
  try {
    await momoService.handleIpn(req.body);  // Gọi sang service
    res.status(200).json({ message: 'IPN xử lý thành công' });
    console.log('IPN MoMo body:', req.body);

  } catch (error) {
    console.error('Error handling IPN:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi xử lý IPN' });
  }
};



