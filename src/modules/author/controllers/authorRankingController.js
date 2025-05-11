const authorRankingService = require("../services/authorRankingService");

//Lấy tất cả bảng xếp hạng tác giả
const getListRankingAuthor = async (req, res) => {
    try {
        // Gọi service để lấy danh sách bảng xếp hạng tác giả
        const rankings = await authorRankingService.getListRankingAuthor();
        
        // Trả về kết quả
        res.status(200).json({ success: true, data: rankings });
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Cập nhật bảng xếp hạng tác giả hàng ngày
 * Sẽ chạy tự động hoặc khi test trên Postman
 */
const updateRankingAuthor = async (req, res) => {
    try {
        // Gọi service để cập nhật bảng xếp hạng tác giả
        await authorRankingService.updateRankingAuthor();
        
        // Trả về thông báo thành công
        res.status(200).json({ success: true, message: "Bảng xếp hạng tác giả đã được cập nhật!" });
    } catch (error) {
        // Xử lý lỗi và trả về thông báo lỗi
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getListRankingAuthor, updateRankingAuthor };
