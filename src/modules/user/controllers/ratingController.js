// controllers/RatingController.js
const Rating = require('../../../models/users/ratingModel');
const NovelService = require('../../../modules/novel/services/novelService');
const ratingService = require('../../../modules/user/services/ratingService');

const addRating = async (req, res) => {
  try {
    const { userId, novelId, rating } = req.body;

    // Kiểm tra nếu đánh giá hợp lệ (1-5 sao)
    if (rating < 1 || rating > 5) {
      return res.status(400).send('Invalid rating. Rating must be between 1 and 5.');
    }

    // Lưu đánh giá
    const newRating = new Rating({ idUser: userId, idNovel: novelId, rating });
    await newRating.save();

    // Gọi service để tính lại điểm trung bình cho tiểu thuyết
    await NovelService.updateNovelRating(novelId);

    res.status(201).send('Rating added successfully.');
  } catch (error) {
    res.status(500).send('Error adding rating.');
  }
};

const getRatingsByNovel = async (req, res) => {
  try {
    const novelId = req.params.novelId; // Lấy novelId từ tham số URL
    const ratings = await ratingService.getRatingsByNovel(novelId); // Gọi service để lấy đánh giá
    res.status(200).json(ratings); // Trả về danh sách đánh giá
  } catch (err) {
    res.status(500).json({ message: err.message || 'Đã xảy ra lỗi' }); // Xử lý lỗi
  }
};

// Xóa đánh giá của người dùng cho một tiểu thuyết
const deleteRating = async (req, res) => {
  try {
    const { novelId, userId } = req.params;

    // Gọi service để xóa đánh giá
    const deletedRating = await ratingService.deleteRating(novelId, userId);

    if (!deletedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }

    // Tính lại điểm trung bình sau khi xóa đánh giá
    await NovelService.updateNovelRating(novelId);

    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error deleting rating' });
  }
};

// lấy đánh giá của user cho một tiểu thuyết cụ thể
const getRatingByUserAndNovel = async (req, res) => {
  try {
    const { novelId, userId } = req.params;
    const rating = await ratingService.getRatingByUserAndNovel(novelId, userId);

    if (!rating) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá.' });
    }

    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server khi lấy đánh giá.', error });
  }
};

module.exports = {
  addRating, getRatingsByNovel, deleteRating, getRatingByUserAndNovel 
};
