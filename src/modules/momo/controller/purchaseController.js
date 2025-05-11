const { purchaseChapter } = require('../service/purchaseChapterService');

const buyChapter = async (req, res) => {
  const userId = req.user?._id;
  const { idChapter, price } = req.body;

  if (!userId || !idChapter || !price) {
    return res.status(400).json({ success: false, message: 'Thiếu dữ liệu đầu vào' });
  }

  const result = await purchaseChapter(userId, idChapter, price);

  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
};


module.exports = { buyChapter };
