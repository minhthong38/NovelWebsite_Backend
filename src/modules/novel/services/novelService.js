const Novel = require("../../../models/novels/novelModel");
const User = require("../../../models/users/userModel");
const Category = require("../../../models/novels/categoryModel");
const Chapter = require('../../../models/novels/chapterModel');
const Rating = require('../../../models/users/ratingModel');
const NotificationService = require("../../user/services/notificationService");

// Phương thức tính điểm trung bình cho tiểu thuyết
const updateNovelRating = async (novelId) => {
    const ratings = await Rating.find({ idNovel: novelId });
  
    if (ratings.length === 0) {
      await Novel.findByIdAndUpdate(novelId, { rate: 0 }); // Nếu không có đánh giá, set rate là 0
      return;
    }
  
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length; // Tính trung bình
  
    await Novel.findByIdAndUpdate(novelId, { rate: averageRating }); // Cập nhật điểm trung bình vào tiểu thuyết
  };

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

        console.log('Tạo thông báo cho người dùng', idUser, novelData.title);
        await NotificationService.createNotification({
            userId: idUser,
            title: "Thêm Novel mới",
            description: `Bạn đã thêm novel "${novelData.title}" thành công.`,
            link: `/listNovels`,
            type: "novel",
        });

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

const deleteAllNovelsByUserId = async (userId) => {
    try {
        const deletedNovels = await Novel.deleteMany({ idUser: userId });
        if (!deletedNovels) {
            throw new Error("Không tìm thấy tiểu thuyết để xóa.");
        }
        return deletedNovels;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateNovelViews = async () => {
  try {
    // Lấy tất cả tiểu thuyết
    const novels = await Novel.find();

    for (const novel of novels) {
      // Lấy tổng view của tất cả chapter thuộc novel này
      const chapters = await Chapter.find({ idNovel: novel._id });
      
      const totalViews = chapters.reduce((sum, chap) => sum + (chap.view || 0), 0);

      // Cập nhật view của tiểu thuyết
      await Novel.findByIdAndUpdate(novel._id, { view: totalViews });
    }

    console.log('✅ Đã cập nhật view cho tất cả tiểu thuyết');
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật view cho tiểu thuyết:', error);
  }
};

module.exports = { updateNovelRating, getNovels, getNovelById,getNovelsByUserId, getNovelsByCategoryId, 
    addNovel, updateNovelById, deleteNovelById, updateNovelViews };
