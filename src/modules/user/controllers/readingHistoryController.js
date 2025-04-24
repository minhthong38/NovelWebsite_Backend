const readingHistoryService = require("../services/readingHistoryService");

// Lấy toàn bộ lịch sử đọc của 1 user (đã populate đầy đủ thông tin)
const getHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await readingHistoryService.getHistoryByUser(userId);

    res.status(200).json(history);
  } catch (error) {
    console.error("Lỗi khi lấy lịch sử đọc:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Tạo hoặc cập nhật lịch sử đọc (upsert)
const createOrUpdateHistory = async (req, res) => {
  try {
    const { idUser, idNovel, idChapter } = req.body;

    const updatedHistory = await readingHistoryService.createOrUpdateHistory({
      idUser,
      idNovel,
      idChapter
    });

    res.status(200).json(updatedHistory);
  } catch (error) {
    console.error("Lỗi khi tạo/cập nhật lịch sử đọc:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Xóa tất cả lịch sử đọc của user theo userId
const deleteAllReadingHistory = async (req, res) => {
  try {
    const { userId } = req.params;  // Lấy userId từ params

    // Gọi service để xóa tất cả lịch sử đọc của user
    await readingHistoryService.deleteAllReadingHistory(userId);

    res.status(200).json({ message: "Đã xóa tất cả lịch sử đọc của người dùng." });
  } catch (error) {
    console.error("Lỗi khi xóa tất cả lịch sử đọc:", error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

module.exports = {
  getHistoryByUser,
  createOrUpdateHistory,
  deleteAllReadingHistory
};
