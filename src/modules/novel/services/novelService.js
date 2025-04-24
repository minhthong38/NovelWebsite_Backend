const Novel = require("../../../models/novels/novelModel");
const User = require("../../../models/users/userModel");
const Category = require("../../../models/novels/categoryModel");
const Chapter = require('../../../models/novels/chapterModel');

//Thêm Novel mới
const addNovel = async (novelData) => {
    try {
        const { idUser, idCategories } = novelData;

        //Kiểm tra User có tồn tại không
        const userExists = await User.findById(idUser);
        if (!userExists) {
            throw new Error("Người dùng không tồn tại.");
        }

        // Kiểm tra từng Category trong danh sách có tồn tại không
        const categoriesExist = await Category.find({ _id: { $in: idCategories } });
        if (categoriesExist.length !== idCategories.length) {
            throw new Error("Một hoặc nhiều danh mục không hợp lệ.");
        }

        const newNovel = new Novel(novelData);
        await newNovel.save();
        return newNovel;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Lấy tất cả Novel
const getNovels = async () => {
    try {
        const novels = await Novel.find()
            .populate("idCategories", "titleCategory")
            .populate("idUser", "fullname username email role avatar");
        return novels;
    } catch (error) {
        throw new Error("Lỗi khi lấy danh sách Novel: " + error.message);
    }
};

//Lấy Novel theo ID
const getNovelById = async (id) => {
    try {
        const novel = await Novel.findById(id)
            .populate("idCategories", "titleCategory")
            .populate("idUser", "fullname username email role");
        if (!novel) {
            throw new Error("Không tìm thấy tiểu thuyết.");
        }
        return novel;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Lấy tất cả Novel của một người dùng
const getNovelsByUserId = async (userId) => {
    try {
      const novels = await Novel.find({ idUser: userId })
        .populate("idCategories", "titleCategory")
        .populate("idUser", "fullname username email role avatar");
      return novels;
    } catch (error) {
      throw new Error('Lỗi khi lấy danh sách tiểu thuyết theo người dùng: ' + error.message);
    }
  };


const getNovelsByCategoryId = async (categoryId) => {
    try {
      const novels = await Novel.find({ idCategories: categoryId })
        .populate("idCategories", "titleCategory")
        .populate("idUser", "fullname username email role avatar");
  
      return novels;
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách tiểu thuyết theo danh mục: " + error.message);
    }
  };
  

//Cập nhật Novel theo ID
const updateNovelById = async (id, updateData) => {
    try {
        const { idUser, idCategories } = updateData;

        // Nếu có cập nhật idUser, kiểm tra User có tồn tại không
        if (idUser) {
            const userExists = await User.findById(idUser);
            if (!userExists) {
                throw new Error("Người dùng không tồn tại.");
            }
        }

        // Nếu có cập nhật idCategories, kiểm tra danh mục có hợp lệ không
        if (idCategories) {
            const categoriesExist = await Category.find({ _id: { $in: idCategories } });
            if (categoriesExist.length !== idCategories.length) {
                throw new Error("Một hoặc nhiều danh mục không hợp lệ.");
            }
        }

        const updatedNovel = await Novel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedNovel) {
            throw new Error("Không tìm thấy tiểu thuyết để cập nhật.");
        }
        return updatedNovel;
    } catch (error) {
        throw new Error(error.message);
    }
};

//Xóa Novel theo ID
const deleteNovelById = async (id) => {
    try {
        const deletedNovel = await Novel.findByIdAndDelete(id);
        if (!deletedNovel) {
            throw new Error("Không tìm thấy tiểu thuyết để xóa.");
        }
        return deletedNovel;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getNovels, getNovelById,getNovelsByUserId, getNovelsByCategoryId, addNovel, updateNovelById, deleteNovelById };
