const transactionService = require('../service/transactionService');

// Tạo giao dịch và số coin nhận được
exports.createTransaction = async (req, res) => {
  try {
    const { idUser, amount, orderInfo, orderId } = req.body;

    // Kiểm tra các field bắt buộc
    if (!amount || !idUser || !orderInfo || !orderId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Tạo giao dịch thông qua transactionService
    const transaction = await transactionService.createTransaction(idUser, amount, orderInfo, orderId);

    res.json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Error creating transaction' });
  }
};

// Lấy danh sách giao dịch của người dùng
exports.getUserTransactions = async (req, res) => {
  try {
    const { idUser } = req.params;
    const transactions = await transactionService.getUserTransactions(idUser);
    res.json(transactions);
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ message: 'Error retrieving transactions' });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật trạng thái giao dịch
exports.updateStatusTransactions = async (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    const updated = await transactionService.updateStatusTransactions(orderId, newStatus);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
