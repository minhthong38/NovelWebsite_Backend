const Bookmark = require("../../../models/novels/bookmarkModel");

// Tạo bookmark mới
const createBookmark = async (bookmarkData) => {
  try {
    // Kiểm tra sự tồn tại của user và chapter
    const userExists = await User.findById(bookmarkData.idUser);
    const chapterExists = await Chapter.findById(bookmarkData.idChapter);

    if (!userExists) {
      throw new Error('Người dùng không tồn tại');
    }

    if (!chapterExists) {
      throw new Error('Chương không tồn tại');
    }

    // Tạo mới bookmark
    const newBookmark = new Bookmark(bookmarkData);
    await newBookmark.save();
    return newBookmark;
  } catch (error) {
    console.error('Lỗi khi tạo bookmark:', error.message);
    throw new Error(`Lỗi khi tạo bookmark: ${error.message}`);
  }
};


// Xóa bookmark theo idChapter
const deleteBookmarkByChapter = async (idChapter) => {
  try {
    // Xóa bookmark theo idChapter
    const result = await Bookmark.deleteMany({ idChapter });
    if (result.deletedCount === 0) {
      throw new Error("Không tìm thấy bookmark để xóa");
    }
    return result;
  } catch (error) {
    console.error("Lỗi khi xóa bookmark:", error);
    throw new Error("Lỗi khi xóa bookmark");
  }
};

// Lấy bookmark theo idChapter
const getBookmarkByChapter = async (chapterId) => {
  try {
    const bookmark = await Bookmark.findOne({ chapterId });
    if (!bookmark) {
      // Trả về đối tượng rỗng hoặc thông báo rằng chưa có bookmark
      return null;
    }
    return bookmark;
  } catch (error) {
    console.error('Error fetching bookmark:', error.message);
    throw new Error('Lỗi khi lấy bookmark');
  }
};


module.exports = {
  createBookmark,
  deleteBookmarkByChapter,
  getBookmarkByChapter
};
