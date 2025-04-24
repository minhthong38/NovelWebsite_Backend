const Chapter = require("../../../models/novels/chapterModel");
const Novel = require("../../../models/novels/novelModel");

const addChapter = async (data) => {
    const { idNovel, title, role, price, imageUrl, content } = data;
  
    if (!content || content.trim() === "") {
      throw new Error("Nội dung chương là bắt buộc!");
    }
  
    // Kiểm tra xem idNovel có hợp lệ và tồn tại trong database không
    const novelExists = await Novel.findById(idNovel);
    if (!novelExists) {
      throw new Error("Tiểu thuyết không tồn tại!");
    }
  
    // Kiểm tra xem Novel đã có chương nào chưa, nếu có lấy order tiếp theo, nếu chưa thì order = 1
    const latestChapter = await Chapter.findOne({ idNovel }).sort({ order: -1 }); // Lấy chương có order cao nhất
    const order = latestChapter ? latestChapter.order + 1 : 1; // Nếu có chương thì order = order tiếp theo, nếu không thì order = 1
  
    // Tạo Chapter
    const chapter = new Chapter({
      idNovel,
      title,
      order,
      role,
      price,
      imageUrl,
      content,
    });
  
    // Lưu chương vào database
    const savedChapter = await chapter.save();
    return { chapter: savedChapter };
  };

/**
 * Lấy danh sách tất cả Chapters (có title của novel)
 */
const getChapters = async () => {
  try {
      return await Chapter.find().populate("idNovel", "title");
  } catch (error) {
      throw new Error(error.message);
  }
};

/**
* Lấy Chapter theo ID (có title của novel)
*/
const getChapterById = async (id) => {
  try {
      const chapter = await Chapter.findById(id).populate("idNovel", "title");
      if (!chapter) {
          throw new Error("Không tìm thấy chapter.");
      }
      return chapter;
  } catch (error) {
      throw new Error(error.message);
  }
};

/**
* Lấy danh sách Chapter có cùng Novel (có title của novel)
*/
const getChaptersByNovelId = async (idNovel) => {
  try {
      return await Chapter.find({ idNovel })
          .populate("idNovel", "title")
          .sort({ order: 1 }); // sắp xếp theo thứ tự chương
  } catch (error) {
      throw new Error("Lỗi khi lấy danh sách chương theo tiểu thuyết: " + error.message);
  }
};

//Cập nhật Chapter theo ID
const updateChapterById = async (id, updateData) => {
    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedChapter) {
            throw new Error("Không tìm thấy chapter để cập nhật.");
        }
        return updatedChapter;
    } catch (error) {
        throw new Error(error.message);
    }
};

//Xóa Chapter theo ID
const deleteChapterById = async (id) => {
    try {
      // Tìm chapter cần xóa
      const deletedChapter = await Chapter.findByIdAndDelete(id);
      if (!deletedChapter) {
        throw new Error("Không tìm thấy chapter để xóa.");
      }
  
      const { idNovel, order: deletedOrder } = deletedChapter;
  
      // Lấy danh sách các chương còn lại cùng novel, sắp xếp theo order
      const remainingChapters = await Chapter.find({ idNovel }).sort({ order: 1 });
  
      // Cập nhật lại thứ tự (order)
      for (let i = 0; i < remainingChapters.length; i++) {
        const chapter = remainingChapters[i];
        const newOrder = i + 1;
        if (chapter.order !== newOrder) {
          chapter.order = newOrder;
          await chapter.save();
        }
      }
  
      return deletedChapter;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

module.exports = { addChapter, getChapters, getChapterById,getChaptersByNovelId, updateChapterById, deleteChapterById };
