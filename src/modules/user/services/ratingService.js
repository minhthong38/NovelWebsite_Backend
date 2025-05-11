const Rating = require('../../../models/users/ratingModel');

const getRatingsByNovel = async (novelId) => {
    try {
      // Truy vấn tất cả đánh giá của truyện dựa trên novelId
      const ratings = await Rating.find({ idNovel: novelId })
        .populate('idUser', 'username avatar'); // Populate để lấy thông tin người dùng (username, avatar)
      return ratings; // Trả về danh sách đánh giá
    } catch (error) {
      throw new Error('Lỗi khi lấy đánh giá theo truyện');
    }
  };

  const deleteRating = async (novelId, userId) => {
    try {
      const deletedRating = await Rating.findOneAndDelete({ idNovel: novelId, idUser: userId });
      return deletedRating;
    } catch (err) {
      throw new Error('Error deleting rating');
    }
  };

  const getRatingByUserAndNovel = async (novelId, userId) => {
    return await Rating.findOne({ idNovel: novelId, idUser: userId });
  };
module.exports = {
    getRatingsByNovel, deleteRating, getRatingByUserAndNovel
};
