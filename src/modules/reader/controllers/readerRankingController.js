const readerRankingService = require("../services/readerRankingService");

//lấy list Ranking
const getListRankingReader = async (req, res) => {
  try {
    const rankings = await readerRankingService.getListRankingReader();
    console.log('Reader Rankings:', rankings);
    res.status(200).json({ success: true, data: rankings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//cập nhật bảng xếp hạng (Chạy thủ công)
const updateRankingReader = async (req, res) => {
  try {
    await readerRankingService.updateRankingReader();
    res.status(200).json({ success: true, message: "Bảng xếp hạng đã được cập nhật!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getListRankingReader, updateRankingReader };
