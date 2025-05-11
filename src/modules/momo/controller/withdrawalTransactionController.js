const { withdrawImmediatelyService } = require('../service/withdrawalTransactionService');

// Controller để người dùng yêu cầu rút tiền
const withdrawImmediately = async (req, res) => {
    try {
      const { amount } = req.body;
      const userId = req.user._id;
  
      // Kiểm tra log để xác nhận dữ liệu nhận được
      console.log("Amount received: ", amount);
  
      const result = await withdrawImmediatelyService(userId, amount);
      res.status(200).json({ success: true, message: "Rút tiền thành công", transaction: result.transaction });
    } catch (error) {
      console.error("Error in withdrawImmediately:", error); // Log chi tiết lỗi
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  

// Controller để người dùng lấy danh sách yêu cầu rút tiền của chính mình
const getUserWithdrawals = async (req, res) => {
  try {
    const userId = req.user.id;
    const withdrawals = await withdrawalService.getUserWithdrawals(userId);
    res.status(200).json(withdrawals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
withdrawImmediately,
  getUserWithdrawals,
};
