// services/walletAuthor.service.js
const WalletAuthor = require('../../../models/momo/walletAuthorModel');
const User = require('../../../models/users/userModel');

const getMonthKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const createWallet = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  if (user.role !== 'author') throw new Error('Only authors can have a wallet');

  const existing = await WalletAuthor.findOne({ userId });
  if (existing) return existing;

  const newWallet = new WalletAuthor({ userId });
  return await newWallet.save();
};

const getWalletByUserId = async (userId) => {
  return await WalletAuthor.findOne({ userId }).populate('userId', 'fullname username avatar');
};

const updateRevenue = async (userId, amount) => {
  const wallet = await WalletAuthor.findOne({ userId });
  if (!wallet) throw new Error('Wallet not found');

  const amountInVND = amount * 5000; // CHUYỂN coin thành VNĐ

  const monthKey = getMonthKey();
  const current = wallet.monthlyRevenue.get(monthKey) || 0;

  wallet.monthlyRevenue.set(monthKey, current + amountInVND);
  wallet.totalRevenue += amountInVND;
  wallet.lastUpdated = new Date();

  return await wallet.save();
};

const deleteWallet = async (userId) => {
  try {
    // Tìm và xóa ví của người dùng theo userId
    const deleted = await WalletAuthor.findOneAndDelete({ userId: userId });

    if (!deleted) {
      console.log("Không tìm thấy ví để xóa.");
      return null; // Trả về null nếu ví không tồn tại
    }

    console.log(`Ví của author với userId: ${userId} đã bị xóa.`);
    return deleted; // Trả về dữ liệu ví đã xóa
  } catch (error) {
    console.error("Lỗi khi xóa ví:", error);
    throw new Error("Lỗi khi xóa ví.");
  }
};

module.exports = {
  createWallet,
  getWalletByUserId,
  updateRevenue,
  deleteWallet
};
