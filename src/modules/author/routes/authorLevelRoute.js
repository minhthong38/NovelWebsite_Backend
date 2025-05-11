const express = require('express');
const route = express.Router();
const authorLevelController = require('../controllers/authorLevelController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

// [GET] Lấy tất cả AuthorLevel
route.get('/', /*authorize(["admin"]),*/ authorLevelController.getAllAuthorLevels);

// [GET] Lấy AuthorLevel theo ID
route.get('/:id', /*authorize(["admin"]),*/ authorLevelController.getAuthorLevelById);

// [POST] Tạo AuthorLevel mới
route.post('/', /*authorize(["admin"]),*/ authorLevelController.createAuthorLevel);

// [PUT] Cập nhật AuthorLevel
route.put('/:id', /*authorize(["admin"]),*/ authorLevelController.updateAuthorLevel);

// [DELETE] Xoá AuthorLevel
route.delete('/:id', /*authorize(["admin"]),*/ authorLevelController.deleteAuthorLevel);

module.exports = route;
