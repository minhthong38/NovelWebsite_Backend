const readerExpService = require("../services/readerExpService");

//lấy tất cả Reader Exp
const getAllReaderExp = async (req, res) => {
    try {
        const data = await readerExpService.getAllReaderExp();
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//lấy Reader Exp theo ID
const getReaderExpById = async (req, res) => {
    const { id } = req.params; 
    try {
        // Gọi service để lấy dữ liệu
        const data = await readerExpService.getReaderExpById(id); 

        // Nếu không tìm thấy dữ liệu
        if (!data) {
            return res.status(404).json({ success: false, message: "Không tìm thấy ReaderExp" });
        }

        // Trả về dữ liệu
        res.status(200).json({ success: true, data });
    } catch (error) {
        // Xử lý lỗi
        res.status(500).json({ success: false, message: error.message });
    }
}; 

//lấy Reader Exp theo IDUser
const getReaderExpByIdUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const readerExp = await readerExpService.getReaderExpByUserId(userId);

    if (!readerExp) {
      return res.status(404).json({ message: "Reader EXP not found for user" });
    }

    res.status(200).json(readerExp);
  } catch (error) {
    console.error("Error getting reader EXP by user ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Cộng EXP khi đọc chapter (mặc định +10)
const addExpToReader = async (req, res) => {
    const { userId } = req.body;
  
    // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }
  
    try {
      // Gọi service để cộng EXP cho người đọc
      const result = await readerExpService.addExpToReader(userId);
      return res.status(200).json({
        message: "Đã cộng 10 EXP cho người đọc",
        data: result,
      });
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình cộng EXP
      console.error("Lỗi khi cộng EXP:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Đã xảy ra lỗi khi cộng EXP",
      });
    }
  };
  

module.exports = { getAllReaderExp, getReaderExpById,getReaderExpByIdUser, addExpToReader };
