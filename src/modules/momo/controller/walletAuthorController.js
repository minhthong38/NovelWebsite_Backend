const walletService = require('../service/walletAuthorService');

const createWallet = async (req, res) => {
  try {
    const { userId } = req.body;
    const wallet = await walletService.createWallet(userId);
    res.status(201).json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await walletService.getWalletByUserId(userId);
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRevenue = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;
    const updated = await walletService.updateRevenue(userId, amount);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteWallet = async (req, res) => {
  const { userId } = req.params; // Lấy userId từ tham số URL

  try {
    const result = await walletService.deleteWallet(userId); // Gọi service xóa ví

    if (!result) {
      return res.status(404).json({ message: "Ví không tồn tại hoặc đã bị xóa." });
    }

    return res.status(200).json({ message: "Xóa ví thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa ví:", error);
    return res.status(500).json({ message: "Lỗi server khi xóa ví." });
  }
};

module.exports = {
  createWallet,
  getWallet,
  updateRevenue,
  deleteWallet
};
