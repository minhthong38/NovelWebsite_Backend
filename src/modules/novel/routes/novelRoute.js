const express = require('express');
const route = express.Router();
const novelController = require('../controllers/novelController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");
const upload = require('../../../middlewares/uploadNovelImg');

//Thêm novel (Test)
route.post('/', /*authorize(["admin", "author"]),*/ novelController.addNovel);

//lấy tất cả novel
route.get('/', /*authorize(["admin", "author"]),*/ novelController.getNovels);

// Lấy novel theo categoryId
route.get('/category/:categoryId', novelController.getNovelByCategoryId);

//Lấy Novel theo idUser
route.get('/user/:userId', /*authorize(["admin", "author"]),*/ novelController.getNovelsByUserId);

//Lấy novel qua Id
route.get('/:id', /*authorize(["admin", "author"]),*/ novelController.getNovelById);

//Cập nhật novel qua Id
route.put('/:id',upload, /*authorize(["admin", "author"]),*/ novelController.updateNovelById);

//Xóa novel qua Id
route.delete('/:id', /*authorize(["admin", "author"]),*/ novelController.deleteNovelById);


module.exports = route;