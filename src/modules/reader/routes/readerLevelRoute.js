const express = require('express');
const route = express.Router();
const readerLevelController = require('../controllers/readerLevelController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

// [GET] Lấy tất cả ReaderLevel
route.get('/', /*authorize(["admin"]),*/ readerLevelController.getAllReaderLevels);

// [GET] Lấy ReaderLevel theo ID
route.get('/:id', /*authorize(["admin"]),*/ readerLevelController.getReaderLevelById);

// [POST] Tạo ReaderLevel mới
route.post('/', /*authorize(["admin"]),*/ readerLevelController.createReaderLevel);

// [PUT] Cập nhật ReaderLevel
route.put('/:id', /*authorize(["admin"]),*/ readerLevelController.updateReaderLevel);

// [DELETE] Xoá ReaderLevel
route.delete('/:id', /*authorize(["admin"]),*/ readerLevelController.deleteReaderLevel);

module.exports = route;
