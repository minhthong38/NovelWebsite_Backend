const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Thêm category
route.post('/', categoryController.addCategory);

//lấy category
route.get('/', categoryController.getCategorys);

//Lấy category qua Id
route.get('/:id', categoryController.getCategoryById);

//Cập nhật category qua Id
route.put('/:id', categoryController.updateCategoryById);

//Xóa category qua Id
route.delete('/:id', categoryController.deleteCategoryById);

module.exports = route;