const FavoriteNovel = require("../../../models/users/favoriteNovelModel");

//Tạo khi chưa có và xóa khi có rồi
const toggleFavorite = async (idUser, idNovel) => {
  console.log("Nhận yêu cầu yêu thích:", idUser, idNovel);
  const existing = await FavoriteNovel.findOne({ idUser, idNovel });

  if (existing) {
    await FavoriteNovel.deleteOne({ _id: existing._id });
    console.log("Đã xóa yêu thích:", idNovel);
    return { message: "Đã xóa khỏi danh sách yêu thích" };
  }

  const newFavorite = new FavoriteNovel({ idUser, idNovel });
  await newFavorite.save();
  console.log("Đã thêm vào danh sách yêu thích:", newFavorite);
  return { message: "Đã thêm vào danh sách yêu thích", data: newFavorite };
};

// Lấy danh sách yêu thích theo idUser
const getFavoritesByUser = async (idUser) => {
  return FavoriteNovel.find({ idUser }).populate({
    path: "idNovel",
    select: "title description view imageUrl rate",
  });
};

// Kiểm tra trạng thái yêu thích
const getFavoriteStatus = async (idUser, idNovel) => {
  return !!(await FavoriteNovel.findOne({ idUser, idNovel }));
};

module.exports = {
  toggleFavorite,
  getFavoritesByUser,
  getFavoriteStatus,
};
