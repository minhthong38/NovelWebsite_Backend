const express = require("express");
const router = express.Router();
const favoriteNovelController = require("../controllers/favoriteNovelController");

// Tạo hoặc xóa yêu thích
router.post("/", favoriteNovelController.toggleFavorite);

// Lấy danh sách yêu thích theo idUser
router.get("/user/:idUser", favoriteNovelController.getFavoritesByUser);

module.exports = router;
