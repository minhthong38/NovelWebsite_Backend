const express = require('express');
const route = express.Router();
const chapterController = require('../controllers/chapterController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Thêm chapter
route.post('/', /*authorize(["admin", "author"]),*/ chapterController.addChapter);

//lấy ds chapter
route.get('/', /*authorize(["admin", "author"]),*/ chapterController.getChapters);

//Lấy chapter qua Id
route.get('/:id', /*authorize(["admin", "author"]),*/ chapterController.getChapterById);

// Lấy danh sách chapter theo idNovel
route.get('/novel/:idNovel', chapterController.getChaptersByNovelId);

//Cập nhật chapter qua Id
route.put('/:id', /*authorize(["admin", "author"]),*/ chapterController.updateChapterById);

//Xóa chapter qua Id
route.delete('/:id', /*authorize(["admin", "author"]),*/ chapterController.deleteChapterById);

module.exports = route;