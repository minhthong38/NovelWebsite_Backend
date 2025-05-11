const ReadingHistory = require("../../../models/users/readingHistoryModel");

// Lấy toàn bộ lịch sử đọc theo userId
const getHistoryByUser = async (userId) => {
  try {
    const history = await ReadingHistory.find({ idUser: userId })
      .populate("idUser", "fullname username avatar")
      .populate("idNovel", "title description view imageUrl rate")
      .populate("idChapter", "title order")
      .sort({ lastReadAt: -1 });

    return history;
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử đọc:", err);
    throw new Error("Không thể lấy lịch sử đọc của người dùng");
  }
};

// Tạo mới hoặc cập nhật lịch sử đọc
const createOrUpdateHistory = async ({ idUser, idNovel, idChapter }) => {
  try {
    const history = await ReadingHistory.findOneAndUpdate(
      { idUser, idNovel },
      { idChapter, lastReadAt: new Date() },
      { new: true, upsert: true }
    );

    return history;
  } catch (err) {
    console.error("Lỗi khi tạo/cập nhật lịch sử đọc:", err);
    throw new Error("Không thể cập nhật lịch sử đọc");
  }
};

// Xóa lịch sử đọc theo ID
const deleteAllReadingHistory = async (userId) => {
  try {
    const result = await ReadingHistory.deleteMany({ idUser: userId });

    if (result.deletedCount === 0) {
      throw new Error("Không có lịch sử đọc nào của người dùng để xóa");
    }

    return result;
  } catch (err) {
    console.error("Lỗi khi xóa tất cả lịch sử đọc:", err);
    throw new Error("Không thể xóa tất cả lịch sử đọc của người dùng");
  }
};

module.exports = {
  getHistoryByUser,
  createOrUpdateHistory,
  deleteAllReadingHistory
};
