const express = require('express');
const route = express.Router();
const authorTaskController = require('../controllers/authorTaskController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Lay61 AuthorTask (Task hiện tại của Author)
route.get('/:id', authorTaskController.getAuthorTaskById);

//Thêm API hoàn thành nhiệm vụ
route.put("/:id", authorTaskController.completeTask);

module.exports = route;