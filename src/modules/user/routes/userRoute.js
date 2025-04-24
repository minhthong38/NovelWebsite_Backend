const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");
const upload = require('../../../middlewares/uploadUserAvatar');

// Thêm một route để lấy thông tin người dùng hiện tại
route.get('/me', authMiddleware, userController.getCurrentUser);

//Xử lý login
route.post('/login', userController.loginUser);

//Thêm user
route.post('/',upload, userController.addUser);

//Lấy user
route.get("/", userController.getUser);

//Xóa user dựa trên Id
route.delete('/:id', userController.deleteUserById);

//Cập nhật user dựa trên Id
route.put('/:id',upload, userController.updateUserById);

module.exports = route;