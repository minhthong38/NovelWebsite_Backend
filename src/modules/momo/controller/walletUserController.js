const walletService = require('../service/walletUserService');

// Controller tạo ví mới cho người dùng
const createWallet = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    const wallet = await walletService.createWallet(userId);
    res.status(201).json({ message: 'Wallet created successfully', wallet });
  } catch (error) {
    console.error('Error creating wallet:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Controller lấy thông tin ví của người dùng
const getWallet = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ params

  try {
    const wallet = await walletService.getWalletByUserId(userId);
    res.status(200).json({ wallet });
  } catch (error) {
    console.error('Error getting wallet:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// Controller cập nhật số dư ví
const updateWallet = async (req, res) => {
  const { userId } = req.params;  // Lấy userId từ params
  const { amount } = req.body;  // Lấy số tiền từ body

  try {
    const newBalance = await walletService.updateWalletBalance(userId, amount);
    res.status(200).json({ message: 'Wallet updated successfully', balance: newBalance });
  } catch (error) {
    console.error('Error updating wallet:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

const deleteWallet = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ tham số URL

  try {
    const result = await WalletUserService.deleteWallet(userId); // Gọi service xóa ví

    if (!result) {
      return res.status(404).json({ message: "Ví không tồn tại hoặc đã bị xóa." });
    }

    return res.status(200).json({ message: "Xóa ví thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa ví:", error);
    return res.status(500).json({ message: "Lỗi server khi xóa ví." });
  }
};



module.exports = { createWallet, getWallet, updateWallet, deleteWallet };
