const cron = require('node-cron');
const Chapter = require('../models/novels/chapterModel');

const updateChapterViews = async () => {
  try {
    // Lấy tất cả các chapter với views đã được lưu trữ trong MongoDB
    const chapters = await Chapter.find();

    for (const chapter of chapters) {
      // Kiểm tra nếu chapter có views lớn hơn 0
      if (chapter.views > 0) {
        // Cập nhật lượt xem vào chapter
        await Chapter.findByIdAndUpdate(chapter._id, {
          $inc: { views: chapter.views },  // Tăng lượt xem cho chapter
        });

        // Reset lại số lượt xem trong chapter sau khi đã cập nhật
        chapter.views = 0;
        await chapter.save();
      }
    }

    console.log('✅ Cập nhật view chương truyện hoàn tất.');
  } catch (error) {
    console.error('Lỗi khi cập nhật view chương:', error);
  }
};

// 🟢 Tự động chạy mỗi 1 phút khi file được require
cron.schedule('*/1 * * * *', updateChapterViews);

console.log('🕒 Cron-job cập nhật view chương đã được thiết lập!');
