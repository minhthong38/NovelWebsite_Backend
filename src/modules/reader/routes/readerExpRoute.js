const express = require('express');
const route = express.Router();
const readerExpController = require('../controllers/readerExpController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Lấy tất cả ReaderExp
route.get('/', /*authorize(["admin"]),*/ readerExpController.getAllReaderExp)

//Lấy Exp Reader theo ID
route.get('/:id', /*authorize(["admin", "reader"]),*/ readerExpController.getReaderExpById);

//Lấy Exp Reader theo IDdUser
route.get('/:id/user/idUser', /*authorize(["admin", "reader"]),*/ readerExpController.getReaderExpByIdUser);

//Cộng EXP khi đọc chapter
route.post('/add-exp', /*authorize(["reader"]),*/ readerExpController.addExpToReader);

module.exports = route;