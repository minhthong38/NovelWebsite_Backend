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

module.exports = { getAuthorTaskById, completeTask };
