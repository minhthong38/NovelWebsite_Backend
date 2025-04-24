const cron = require("node-cron");
const { updateRankingReader } = require("../modules/reader/services/readerRankingService.js");
const { updateRankingAuthor } = require("../modules/author/services/authorRankingService.js");
const { updateRankingNovel } = require("../modules/novel/services/novelRankingService.js");

// Chạy mỗi ngày vào lúc 00:00 (giờ server)
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Đang cập nhật bảng xếp hạng người đọc...");
    await updateRankingReader();
    console.log("Bảng xếp hạng người đọc đã được cập nhật!");

    console.log("Đang cập nhật bảng xếp hạng tiểu thuyết...");
    await updateRankingNovel();
    console.log("Bảng xếp hạng tiểu thuyết đã được cập nhật!");

    console.log("Đang cập nhật bảng xếp hạng author...");
    await updateRankingAuthor();
    console.log("Bảng xếp hạng author đã được cập nhật!");
  } catch (error) {
    console.error("Lỗi khi cập nhật bảng xếp hạng:", error);
  }
});

console.log("Cron-job cập nhật bảng xếp hạng đã được thiết lập!");
