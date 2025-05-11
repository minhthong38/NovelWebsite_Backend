const bookmarkService = require("../services/bookmarkService");

// Tạo bookmark
const createBookmark = async (req, res) => {
  try {
    const bookmarkData = req.body;

    if (!bookmarkData.idUser || !bookmarkData.idChapter) {
      return res.status(400).json({
        success: false,
        message: 'Thiếu idUser hoặc idChapter',
      });
    }

    const bookmark = await bookmarkService.createBookmark(bookmarkData);
    res.status(201).json({ success: true, data: bookmark });
  } catch (error) {
    console.error("Lỗi tạo bookmark:", error.message);
    res.status(500).json({ success: false, message: "Lỗi server khi tạo bookmark", error: error.message });
  }
};


// Xóa bookmark theo idChapter
const deleteBookmarkByChapter = async (req, res) => {
  try {
    const { idChapter } = req.params;
    await bookmarkService.deleteBookmarkByChapter(idChapter);
    res.status(200).json({ success: true, message: "Xóa bookmark thành công" });
  } catch (error) {
    console.error("Lỗi xóa bookmark:", error);
    res.status(500).json({ success: false, message: "Lỗi server khi xóa bookmark" });
  }
};

// Lấy bookmark theo idChapter
const getBookmarkByChapter = async (req, res) => {
  const { chapterId } = req.params;
  try {
    const bookmark = await bookmarkService.getBookmarkByChapter(chapterId);
    if (!bookmark) {
      return res.status(200).json({ message: 'Chưa có bookmark cho chương này' });
    }
    res.status(200).json(bookmark);
  } catch (error) {
    console.error('Error fetching bookmark:', error.message);
    res.status(500).json({ message: 'Lỗi khi lấy bookmark', error: error.message });
  }
};

module.exports = {
  createBookmark,
  deleteBookmarkByChapter,
  getBookmarkByChapter
};
