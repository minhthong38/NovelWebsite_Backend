const bookmarkService = require("../services/bookmarkService");

const toggleBookmark = async (req, res) => {
  try {
    const { idUser, idChapter } = req.body;
    const result = await bookmarkService.toggleBookmark(idUser, idChapter);
    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi toggle bookmark:", error);
    res.status(500).json({ message: "Không thể xử lý bookmark" });
  }
};

module.exports = {
  toggleBookmark
};
