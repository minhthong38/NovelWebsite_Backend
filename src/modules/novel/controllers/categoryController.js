const categoryService = require("../services/categoryService");

//Thêm Category
const addCategory = async (req, res) => {
    try {
        const { titleCategory, description } = req.body;

        if (!titleCategory) {
            return res.status(400).json({ success: false, message: "Tên danh mục là bắt buộc." });
        }

        const newCategory = await categoryService.addCategory(titleCategory, description);
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Lấy tất cả Categories
const getCategorys = async (req, res) => {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Lấy Category theo ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        res.status(200).json({ success: true, data: category });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Cập nhật Category theo ID
const updateCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedCategory = await categoryService.updateCategoryById(id, updateData);
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Xóa Category theo ID
const deleteCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategoryById(id);
        res.status(200).json({ success: true, message: "Danh mục đã bị xóa." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { addCategory, getCategorys, getCategoryById, updateCategoryById, deleteCategoryById };
