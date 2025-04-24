const express = require('express');
const route = express.Router();
const authorExpController = require('../controllers/authorExpController');
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Lấy tất cả Exp Author
route.get('/', /*authorize(["admin"]),*/ authorExpController.getAllAuthorExp)

//lấy Exp Author theo IDUser
route.get('/user/:idUser', /*authorize(["admin", "author"]),*/ authorExpController.getAuthorExpByIdUser);

//Lấy Exp AuthorExp theo ID
route.get('/:id', /*authorize(["admin", "author"]),*/ authorExpController.getAuthorExpById);

module.exports = route;