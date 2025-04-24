const taskService = require("../services/taskService");

/**
 * Thêm Task
 */
const addTask = async (req, res) => {
    try {
        const newTask = await taskService.addTask(req.body);
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Lấy danh sách Task
 */
const getTask = async (req, res) => {
    try {
        const tasks = await taskService.getTask();
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Xóa Task theo ID
 */
const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        await taskService.deleteTaskById(id);
        res.status(200).json({ success: true, message: "Đã xóa task thành công." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * Cập nhật Task theo ID
 */
const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await taskService.updateTaskById(id, req.body);
        res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { addTask, getTask, deleteTaskById, updateTaskById };
