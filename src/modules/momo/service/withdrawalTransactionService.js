const WithdrawalTransaction = require('../../../models/momo/withdrawalTransactionModel');
const WalletAuthor = require('../../../models/momo/walletAuthorModel');
const mongoose = require('mongoose');

// Service để tạo yêu cầu rút tiền
const withdrawImmediatelyService = async (userId, amount) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      if (amount < 10000) {
        throw new Error("Số tiền rút tối thiểu là 10,000 VNĐ");
      }
  
      // Tìm ví của tác giả
      const wallet = await WalletAuthor.findOne({ userId }).session(session);
      if (!wallet) {
        throw new Error("Không tìm thấy ví tác giả");
      }
  
      if (wallet.totalRevenue < amount) {
        throw new Error("Số dư ví không đủ để rút tiền");
      }
  
      // Trừ tiền
      wallet.totalRevenue -= amount;
      wallet.lastUpdated = new Date();
  
      // Trừ trong thống kê tháng
      const monthKey = new Date().toISOString().slice(0, 7);
      const currentMonthRevenue = wallet.monthlyRevenue.get(monthKey) || 0;
      wallet.monthlyRevenue.set(monthKey, currentMonthRevenue - amount);
  
      await wallet.save({ session });
  
      // Ghi log giao dịch
      const transaction = new WithdrawalTransaction({
        userId,
        amount,
        status: 'approved',
        method: 'momo',
        accountInfo: 'MomoAccount',
        note: 'Rút tiền tự động'
      });
      await transaction.save({ session });
  
      await session.commitTransaction();
      session.endSession();
  
      return { success: true, transaction };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error(error.message);
    }
  };

// Service để người dùng lấy danh sách yêu cầu rút tiền của chính mình
const getUserWithdrawals = async (userId) => {
  return await WithdrawalTransaction.find({ userId }).sort({ createdAt: -1 });
};

module.exports = {
withdrawImmediatelyService,
  getUserWithdrawals,
};
