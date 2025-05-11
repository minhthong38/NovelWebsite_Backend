const express = require("express");
const route = express.Router();
const novelRankingController = require("../controllers/novelRankingController");

// Lấy danh sách 10 novel có view cao nhất
route.get("/", novelRankingController.getListRankingNovel);

// Cập nhật bảng xếp hạng (tự động cập nhật sau 12h)
route.put("/update", novelRankingController.updateRankingNovel);

module.exports = route;
