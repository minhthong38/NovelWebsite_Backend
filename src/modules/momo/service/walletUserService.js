const Wallet = require('../../../models/momo/walletUserModel');

// Tạo ví cho người dùng mới
const createWallet = async (userId) => {
    try {
      // Kiểm tra ví đã tồn tại chưa
      const existingWallet = await Wallet.findOne({ userId });
      if (existingWallet) {
        throw new Error('Wallet already exists');
      }
  
      const wallet = new Wallet({ userId });
      await wallet.save();
      return wallet;
    } catch (error) {
      throw error;
    }
  };

// Lấy thông tin ví của người dùng
const getWalletByUserId = async (userId) => {
  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet;
  } catch (error) {
    throw error;
  }
};

// Cập nhật số dư ví
const updateWalletBalance = async (userId, amount) => {
  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }

    wallet.balance += amount;  // Cập nhật số dư ví
    wallet.updatedAt = Date.now();
    await wallet.save();
    return wallet.balance;  // Trả về số dư ví mới
  } catch (error) {
    throw error;
  }
};

const deleteWallet = async (userId) => {
  try {
    // Tìm và xóa ví của người dùng theo userId
    const deleted = await Wallet.findOneAndDelete({ userId: userId });

    if (!deleted) {
      console.log("Không tìm thấy ví để xóa.");
      return null; // Trả về null nếu ví không tồn tại
    }

    console.log(`Ví của người dùng với userId: ${userId} đã bị xóa.`);
    return deleted; // Trả về dữ liệu ví đã xóa
  } catch (error) {
    console.error("Lỗi khi xóa ví:", error);
    throw new Error("Lỗi khi xóa ví.");
  }
};


module.exports = {
  createWallet,
  getWalletByUserId,
  updateWalletBalance,
  deleteWallet
};
