const novelService = require("../services/novelService");


//Thêm Novel mới test Postman
const addNovel = async (req, res) => {
    try {
        const { title, idUser, description, idCategories, imageUrl, status } = req.body;

        if (!title || !idCategories) {
            return res.status(400).json({ success: false, message: "Tiêu đề và danh mục là bắt buộc." });
        }

        const newNovel = await novelService.addNovel({ title,idUser, description, idCategories, imageUrl, status });
        res.status(201).json({ success: true, data: newNovel });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Lấy tất cả Novel
const getNovels = async (req, res) => {
    try {
        const novels = await novelService.getNovels();
        res.status(200).json({ success: true, data: novels });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Lấy Novel theo ID
const getNovelById = async (req, res) => {
    try {
        const { id } = req.params;
        const novel = await novelService.getNovelById(id);
        res.status(200).json({ success: true, data: novel });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Lấy Novel theo idUser
const getNovelsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const novels = await novelService.getNovelsByUserId(userId);
        res.status(200).json({ success: true, data: novels });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getNovelByCategoryId = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const novels = await novelService.getNovelsByCategoryId(categoryId);
      res.status(200).json({ success: true, data: novels });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  

//Cập nhật Novel theo ID
const updateNovelById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Nếu có file được upload
    if (req.files && req.files.length > 0) {
      const uploadedImage = req.files[0];
      updateData.imageUrl = uploadedImage.path; // link từ Cloudinary
    }

    const updatedNovel = await novelService.updateNovelById(id, updateData);
    res.status(200).json(updatedNovel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

  

//Xóa Novel theo ID
const deleteNovelById = async (req, res) => {
    try {
        const { id } = req.params;
        await novelService.deleteNovelById(id);
        res.status(200).json({ success: true, message: "Tiểu thuyết đã bị xóa." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { addNovel, getNovels, getNovelById,getNovelsByUserId, getNovelByCategoryId, updateNovelById, deleteNovelById };
