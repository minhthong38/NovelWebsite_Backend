const authorTaskService = require("../services/authorTaskService");

const getAuthorTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const authorTask = await authorTaskService.getAuthorTaskById(id);
        res.status(200).json({ success: true, data: authorTask });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

const getAuthorTaskByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const task = await authorTaskService.getAuthorTaskByUserId(userId);

    if (!task) {
      return res.status(404).json({ success: false, message: "Không tìm thấy nhiệm vụ tác giả." });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    console.error("🔥 Lỗi khi lấy nhiệm vụ tác giả theo userId:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Hoàn thành Task
const completeTask = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await authorTaskService.completeAuthorTask(id);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = { getAuthorTaskById,getAuthorTaskByUserId, completeTask };
