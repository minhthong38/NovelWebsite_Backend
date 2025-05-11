const NovelRanking = require("../../../models/novels/novelRankingModel");
const Novel = require("../../../models/novels/novelModel");

/**
 * Lấy danh sách 10 Novel có thứ hạng cao nhất từ bảng NovelRanking
 */
const getListRankingNovel = async () => {
    try {
        const rankings = await NovelRanking.find()
            .populate("idNovel", "title imageUrl view") // Lấy thông tin từ Novel
            .sort({ viewTotal: -1 }) // Sắp xếp theo tổng lượt xem
            .limit(10); // Giới hạn top 10

        return rankings;
    } catch (error) {
        console.error("Lỗi khi lấy bảng xếp hạng:", error);
        throw new Error(error.message);
    }
};

/**
 * Cập nhật bảng xếp hạng với 10 tiểu thuyết có lượt xem cao nhất
 */
const updateRankingNovel = async () => {
    try {
        console.log("Bắt đầu cập nhật bảng xếp hạng tiểu thuyết...");

        // Lấy 10 novel có lượt xem cao nhất từ bảng Novel
        const topNovels = await Novel.find()
            .sort({ view: -1 }) // Sắp xếp giảm dần theo lượt xem
            .limit(10)
            .select("_id view");

        // Danh sách ID novel trong top 10
        const topNovelIds = topNovels.map(novel => novel._id);

        // In ra danh sách ID tiểu thuyết đã chọn
        console.log("Danh sách ID top 10 tiểu thuyết:", topNovelIds);

        // Xóa bảng xếp hạng cũ, xóa những tiểu thuyết không còn trong top 10
        console.log("Đang xóa các tiểu thuyết không còn trong top 10...");
        const deleteResult = await NovelRanking.deleteMany({ idNovel: { $nin: topNovelIds } });

        // Kiểm tra xem có bản ghi nào bị xóa không
        console.log(`Đã xóa ${deleteResult.deletedCount} tiểu thuyết không còn trong top 10.`);

        // Cập nhật bảng xếp hạng mới
        const rankingUpdates = topNovels.map((novel) => ({
            idNovel: novel._id,
            viewTotal: novel.view, // Cập nhật số lượt xem
        }));

        // In ra thông tin bảng xếp hạng mới
        console.log("Danh sách bảng xếp hạng mới:", rankingUpdates);

        // Chúng ta sẽ không dùng `insertMany` vì sẽ tạo ra các bản sao, thay vào đó sử dụng `bulkWrite` để update hoặc upsert dữ liệu
        const bulkOps = rankingUpdates.map((update) => ({
            updateOne: {
                filter: { idNovel: update.idNovel }, // Kiểm tra theo idNovel
                update: { $set: { viewTotal: update.viewTotal } }, // Cập nhật viewTotal
                upsert: true, // Nếu không có thì thêm mới
            },
        }));

        // Thực hiện cập nhật bảng xếp hạng mới hoặc chèn mới vào nếu chưa có
        const bulkResult = await NovelRanking.bulkWrite(bulkOps, { ordered: false });
        
        // Kiểm tra kết quả bulkWrite
        console.log(`Đã thực hiện ${bulkResult.nUpserted} bản ghi mới và ${bulkResult.nModified} bản ghi đã được cập nhật.`);

        console.log("Bảng xếp hạng tiểu thuyết đã được cập nhật!");
        
        // Trả về thông điệp thành công
        return { message: "Cập nhật bảng xếp hạng thành công!" };

    } catch (error) {
        console.error("Lỗi khi cập nhật bảng xếp hạng tiểu thuyết:", error);
        // Trả về thông điệp lỗi khi có vấn đề
        return { message: error.message };
    }
};



module.exports = {getListRankingNovel, updateRankingNovel };
