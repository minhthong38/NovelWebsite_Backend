const express = require('express');
const route = express.Router();
const taskController = require('../controllers/taskController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Thêm Task
route.post('/', taskController.addTask);

//Lấy Task
route.get('/', taskController.getTask);

//Xóa Task dựa trên Id
route.delete('/:id', taskController.deleteTaskById);

//Cập nhật Task dựa trên Id
route.put('/:id', taskController.updateTaskById);

module.exports = route;