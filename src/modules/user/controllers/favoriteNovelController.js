const favoriteNovelService = require("../services/favoriteNovelService");

// Toggle yêu thích
const toggleFavorite = async (req, res) => {
  try {
    const { idUser, idNovel } = req.body;

    // Kiểm tra nếu idUser hoặc idNovel không có
    if (!idUser || !idNovel) {
      return res.status(400).json({ message: "Thiếu idUser hoặc idNovel" });
    }

    console.log("Yêu cầu thêm/xóa yêu thích:", idUser, idNovel);
    const result = await favoriteNovelService.toggleFavorite(idUser, idNovel);
    console.log("Kết quả API:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi xử lý yêu thích:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};


// Lấy danh sách yêu thích theo người dùng
const getFavoritesByUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log("Lấy danh sách yêu thích của user:", idUser);
    const favorites = await favoriteNovelService.getFavoritesByUser(idUser);
    console.log("Danh sách yêu thích trả về:", favorites);
    res.status(200).json({ data: favorites });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách yêu thích:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Kiểm tra trạng thái yêu thích
const checkFavoriteStatus = async (req, res) => {
  try {
    const { idUser, idNovel } = req.params;
    console.log(`Kiểm tra trạng thái yêu thích: Người dùng ${idUser} - Truyện ${idNovel}`);

    const isFavorited = await favoriteNovelService.getFavoriteStatus(idUser, idNovel);

    res.status(200).json({ isFavorited });
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái yêu thích:", error);
    res.status(500).json({ message: "Lỗi server khi kiểm tra trạng thái yêu thích" });
  }
};

module.exports = {
  toggleFavorite,
  getFavoritesByUser,
  checkFavoriteStatus,
};
