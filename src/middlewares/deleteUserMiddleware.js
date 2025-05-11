const ReaderRanking = require("../models/readers/readerRankingModel");

/**
 * Middleware: Xóa User khỏi bảng xếp hạng khi User bị xóa
 */
const deleteUserRanking = async function (next) {
  const user = await this.model.findOne(this.getQuery()); // Lấy User bị xóa
  if (user) {
    await ReaderRanking.deleteMany({ idUser: user._id }); // Xóa khỏi bảng xếp hạng
    console.log(`🚀 User ${user.fullname} đã bị xóa, đồng thời xóa khỏi bảng xếp hạng.`);
  }
  next();
};

module.exports = deleteUserRanking;
