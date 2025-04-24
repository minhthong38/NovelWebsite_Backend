const Category = require("../../../models/novels/categoryModel");

/**
 * Thêm Category
 */
const addCategory = async (titleCategory, description) => {
    try {
        // Kiểm tra trùng tên
        const existingCategory = await Category.findOne({ titleCategory });
        if (existingCategory) {
            throw new Error("Danh mục này đã tồn tại.");
        }

        const newCategory = new Category({ titleCategory, description });
        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Lấy danh sách tất cả Categories
 */
const getCategories = async () => {
    try {
        return await Category.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Lấy Category theo ID
 */
const getCategoryById = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error("Không tìm thấy danh mục.");
        }
        return category;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Cập nhật Category theo ID
 */
const updateCategoryById = async (id, updateData) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCategory) {
            throw new Error("Không tìm thấy danh mục để cập nhật.");
        }
        return updatedCategory;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * Xóa Category theo ID
 */
const deleteCategoryById = async (id) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error("Không tìm thấy danh mục để xóa.");
        }
        return deletedCategory;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { addCategory, getCategories, getCategoryById, updateCategoryById, deleteCategoryById };
