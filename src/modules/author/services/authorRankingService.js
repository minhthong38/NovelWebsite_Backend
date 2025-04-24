const AuthorRanking = require("../../../models/authors/authorRankingModel");
const Novel = require("../../../models/novels/novelModel");
const User = require("../../../models/users/userModel");

/**
 * Lấy 10 tác giả có tổng lượt xem cao nhất
 */
const getListRankingAuthor = async () => {
  try {
      // Lấy 10 tác giả có tổng lượt xem cao nhất, sắp xếp theo viewTotal giảm dần
      return await AuthorRanking.find()
          .sort({ viewTotal: -1 })  // Sắp xếp theo tổng lượt xem giảm dần
          .populate({
            path: "idUser",
            select: "avatar fullname", // Lấy fullname từ User
          })
          .limit(10);  // Lấy 10 bản ghi đầu tiên
  } catch (error) {
      throw new Error(error.message);
  }
};

const updateRankingAuthor = async () => {
    try {
      console.log("Bắt đầu cập nhật bảng xếp hạng tác giả...");
  
      // Lấy danh sách tất cả các tác giả (idUser)
      const authors = await User.find({ role: 'author' });
  
      if (!authors || authors.length === 0) {
        console.log("Không có tác giả nào trong hệ thống!");
        return;
      }
  
      // Tính tổng số lượt xem cho từng tác giả
      const rankingUpdates = [];
  
      for (const author of authors) {
        // Lấy tất cả các tiểu thuyết của tác giả đó
        const novels = await Novel.find({ idUser: author._id });
  
        if (!novels || novels.length === 0) {
          console.log(`Tác giả ${author._id} không có tiểu thuyết nào.`);
        }
  
        // Tính tổng số lượt xem của các tiểu thuyết của tác giả
        const totalViews = novels.reduce((acc, novel) => acc + novel.view, 0);
  
        // Thêm thông tin vào danh sách cập nhật bảng xếp hạng
        rankingUpdates.push({
          idUser: author._id,
          viewTotal: totalViews,
        });
      }
  
      // Sắp xếp bảng xếp hạng theo tổng lượt xem (từ cao xuống thấp)
      rankingUpdates.sort((a, b) => b.viewTotal - a.viewTotal);
  
      // Chỉ lấy top 10 tác giả
      const top10Ranking = rankingUpdates.slice(0, 10);
  
      // Xóa bảng xếp hạng cũ
      await AuthorRanking.deleteMany({});
  
      // Cập nhật bảng xếp hạng mới
      await AuthorRanking.insertMany(top10Ranking);
  
      console.log("Bảng xếp hạng tác giả đã được cập nhật!");
    } catch (error) {
      console.error("Lỗi khi cập nhật bảng xếp hạng tác giả:", error);
    }
  };
  
  

module.exports = { getListRankingAuthor, updateRankingAuthor };
