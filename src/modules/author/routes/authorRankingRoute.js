const express = require('express');
const route = express.Router();
const authorRankingController = require('../controllers/authorRankingController');
const { authorize } = require("../../../middlewares/authMiddleware");

//Lấy tất cả Author Ranking (Show trên trang và Show cho Admin)
route.get('/', /*authorize(["admin"]),*/ authorRankingController.getListRankingAuthor)

//Cập nhật Author Ranking (Test Postman)
route.put('/update', authorRankingController.updateRankingAuthor);

module.exports = route;