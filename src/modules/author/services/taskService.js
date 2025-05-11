const Task = require("../../../models/authors/taskModel");

//Thêm Task mới
const addTask = async (taskData) => {
    if (!taskData.order) {
      const lastTask = await Task.findOne().sort("-order");
      taskData.order = lastTask ? lastTask.order + 1 : 1;
    }
    
    const newTask = new Task(taskData);
    return await newTask.save();
  };
  
  module.exports = {
    addTask,
  };

//Lấy danh sách Task
const getTask = async () => {
    try {
        return await Task.find().sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(error.message);
    }
};

//Xóa Task theo ID
const deleteTaskById = async (id) => {
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            throw new Error("Không tìm thấy Task.");
        }
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
};

//Cập nhật Task theo ID
const updateTaskById = async (id, updatedData) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTask) {
            throw new Error("Không tìm thấy Task.");
        }
        return updatedTask;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { addTask, getTask, deleteTaskById, updateTaskById };
