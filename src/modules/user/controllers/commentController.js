const commentService = require("../services/commentService");

//Thêm Comment
const addComment = async (req, res) => {
    try {
        const { idNovel, idUser, content } = req.body;

        if (!idNovel || !idUser || !content) {
            return res.status(400).json({ success: false, message: "idNovel, idUser và content là bắt buộc." });
        }

        const newComment = await commentService.addComment({ idNovel, idUser, content });
        res.status(201).json({ success: true, data: newComment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Lấy tất cả comment của 1 Novel
const getCommentsByNovel = async (req, res) => {
    try {
      const { idNovel } = req.params;
      const comments = await commentService.getCommentsByNovel(idNovel);
      res.status(200).json(comments);
    } catch (error) {
      console.error("Lỗi khi lấy comment theo novel:", error);
      res.status(500).json({ message: "Không thể lấy danh sách bình luận" });
    }
  };

//Lấy Comment theo ID
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await commentService.getCommentById(id);
        res.status(200).json({ success: true, data: comment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Xóa Comment theo ID
const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        await commentService.deleteCommentById(id);
        res.status(200).json({ success: true, message: "Comment đã bị xóa." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { 
    addComment,
    getCommentsByNovel,
    getCommentById, 
    deleteCommentById 
};
