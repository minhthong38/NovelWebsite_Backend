const ReaderRanking = require("../../../models/readers/readerRankingModel");
const ReaderExp = require("../../../models/readers/readerExpModel");

//Lấy danh sách 10 người có EXP cao nhất
const getListRankingReader = async () => {
  try {
    return await ReaderRanking.find()
      .sort({ totalExp: -1 }) // Sắp xếp theo tổng EXP giảm dần
      .limit(10)              // Lấy 10 người đầu tiên
      .populate({
        path: "idUser",
        select: "fullname avatar" // Lấy fullname từ User
      })
      .populate({
        path: "idReaderExp",
        select: "totalExp", // Lấy totalExp từ ReaderExp
      });
  } catch (error) {
    throw new Error(error.message);
  }
};


//Cập nhật bảng Ranking (tự động mỗi ngày)
const updateRankingReader = async () => {
  try {
    console.log("Bắt đầu cập nhật bảng xếp hạng...");

    // Lấy 10 người có totalExp cao nhất từ ReaderExp
    const topReaders = await ReaderExp.find()
      .sort({ totalExp: -1 })
      .limit(10);

    // Xóa bảng xếp hạng cũ
    await ReaderRanking.deleteMany({});

    // Cập nhật bảng xếp hạng mới
    const rankingUpdates = topReaders.map((reader) => ({
      idUser: reader.idUser,
      idReaderExp: reader._id, // Lưu id của ReaderExp
    }));

    await ReaderRanking.insertMany(rankingUpdates);

    console.log("Bảng xếp hạng đã được cập nhật!");
  } catch (error) {
    console.error("Lỗi khi cập nhật bảng xếp hạng:", error);
  }
};

module.exports = { getListRankingReader, updateRankingReader };
