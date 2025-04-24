const novelRankingService = require("../services/novelRankingService");

/**
 * Lấy danh sách 10 tiểu thuyết có view cao nhất từ NovelRanking
 */
const getListRankingNovel = async (req, res) => {
    try {
        const rankings = await novelRankingService.getListRankingNovel();
        // Kiểm tra nếu không có kết quả nào
        if (!rankings || rankings.length === 0) {
            return res.status(404).json({ success: false, message: "Không tìm thấy tiểu thuyết xếp hạng." });
        }
        res.status(200).json({ success: true, data: rankings });
    } catch (error) {
        console.error("Lỗi khi lấy bảng xếp hạng:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Cập nhật bảng xếp hạng với 10 tiểu thuyết có view cao nhất
 */
const updateRankingNovel = async (req, res) => {
    try {
        const result = await novelRankingService.updateRankingNovel();
        // Kiểm tra kết quả trả về
        if (result && result.message) {
            res.status(200).json({ success: true, message: result.message });
        } else {
            res.status(500).json({ success: false, message: "Không có thông điệp thành công từ dịch vụ" });
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật bảng xếp hạng:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { getListRankingNovel, updateRankingNovel };
