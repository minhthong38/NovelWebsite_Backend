const AuthorExp = require("../../../models/authors/authorExpModel");
const { addExpForAuthor } = require("./expUtils");
const AuthorLevel = require("../../../models/authors/authorLevelModel");

const createAuthorExp = async (userId) => {
  try {
    const existingExp = await AuthorExp.findOne({ idUser: userId });
    if (!existingExp) {
      const level1 = await AuthorLevel.findOne({ level: 1 });
      if (!level1) {
        console.error("❌ Không tìm thấy AuthorLevel cấp 1!");
        return;
      }

      const authorExp = await AuthorExp.create({
        idUser: userId,
        idLevel: level1._id,
      });

      // Tạo AuthorTask tương ứng
      await AuthorTaskService.createAuthorTask(authorExp._id);

      console.log("✅ AuthorExp và AuthorTask đã được tạo!");
    } else {
      console.log("ℹ️ AuthorExp đã tồn tại, không tạo lại!");
    }
  } catch (error) {
    console.error("🔥 Lỗi trong createAuthorExp:", error.message);
    throw error;
  }
};

//Lấy AuthorExp theo IDUser
const getByUserId = async (userId) => {
  try {
    const authorExp = await AuthorExp.findOne({ idUser: userId })
      .populate("idUser", "username email")
      .populate("idLevel", "level title");
    return authorExp;
  } catch (error) {
    throw error;
  }
};

// Xóa AuthorExp (kèm theo AuthorTask)
const deleteAuthorExp = async (userId) => {
  try {
    const authorExp = await AuthorExp.findOne({ idUser: userId });
    if (authorExp) {
      await AuthorExp.deleteOne({ idUser: userId });
      console.log("🗑️ AuthorExp đã bị xóa!");

      // Xóa nhiệm vụ của tác giả liên quan
      await AuthorTaskService.deleteAuthorTask(authorExp._id);
    }
  } catch (error) {
    throw new Error("🔥 Lỗi khi xóa AuthorExp: " + error.message);
  }
};

// Lấy tất cả AuthorExp
const getAllAuthorExp = async () => {
  return await AuthorExp.find()
    .populate("idUser", "username email")
    .populate("idLevel", "level title"); // Thêm dòng này
};

// Lấy thông tin Exp của một Author theo ID
const getAuthorExpById = async (id) => {
  return await AuthorExp.findById(id)
    .populate("idUser", "username email")
    .populate("idLevel", "level title"); // Thêm dòng này
};

// Xuất tất cả các hàm
module.exports = {
  createAuthorExp,
  deleteAuthorExp,
  getAllAuthorExp,
  getByUserId,
  getAuthorExpById,
  addExpForAuthor,
};
