const express = require('express');
const route = express.Router();
const authorTaskController = require('../controllers/authorTaskController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Lấy AuthorTask (Task hiện tại của Author)
route.get('/:id', authorTaskController.getAuthorTaskById);

//Lấy AuthorTask (Task hiện tại của Author) theo IDUser
route.get('/user/:userId', authorTaskController.getAuthorTaskByUserId);

//Thêm API hoàn thành nhiệm vụ
route.put("/:id", authorTaskController.completeTask);

module.exports = route;