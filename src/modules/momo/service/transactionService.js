const Transaction = require('../../../models/momo/transactionModel');

// Hàm tính số coin từ số tiền
const calculateCoins = (amount) => {
  const conversionRate = 5000;  // 1 coin = 5000 tiền
  return amount / conversionRate;  // Số coin = Số tiền / conversionRate
};

// Hàm lưu giao dịch và số coin nhận được
exports.createTransaction = async (idUser, amount, orderInfo, orderId) => {
  try {
    const coinsReceivedFromAmount = calculateCoins(amount);
    const coinsReceived = coinsReceivedFromAmount;

    const transaction = new Transaction({
      idUser,
      amount,
      coinsReceived,
      orderInfo,
      transactionStatus: 'pending',
      orderId,
    });

    await transaction.save();
    return transaction;
  } catch (error) {
    console.error('Error saving transaction:', error.message);
    throw new Error('Transaction creation failed: ' + error.message);
  }
};

// Cập nhật trạng thái giao dịch
exports.updateStatusTransactions = async (orderId, status) => {
  try {
    const transaction = await Transaction.findOne({ orderId });
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    transaction.transactionStatus = status;  // Cập nhật trạng thái giao dịch
    await transaction.save(); // Lưu thay đổi vào database
    return transaction; // Trả về transaction đã cập nhật
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
};

// Lấy giao dịch của người dùng
exports.getUserTransactions = async (idUser) => {
  try {
    return await Transaction.find({ idUser }).sort({ createdAt: -1 });
  } catch (error) {
    throw new Error('Failed to retrieve transactions: ' + error.message);
  }
};

exports.getAllTransactions = async () => {
  return await Transaction.find().sort({ createdAt: -1 });
};
