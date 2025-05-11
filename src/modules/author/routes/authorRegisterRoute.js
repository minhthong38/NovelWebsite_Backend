const express = require("express");
const router = express.Router();
const authorRegisterController = require("../controllers/authorRegisterController");

// Reader đăng ký làm author
router.post("/register", authorRegisterController.registerAsAuthor);

// Kiểm tra trạng thái yêu cầu làm tác giả
router.get('/check/:userId', authorRegisterController.checkAuthorRequestStatus);

// Route cho admin lấy danh sách các yêu cầu đăng ký
router.get("/admin", authorRegisterController.getAllAuthorRequests);

// Route cho admin duyệt yêu cầu đăng ký của reader
router.patch("/admin/:id/approve", authorRegisterController.approveAuthorRequest); //id là id của authorRegister

// Route cho admin từ chối yêu cầu đăng ký của reader
router.patch("/admin/:id/refuse", authorRegisterController.refuseAuthorRequest); //id là id của authorRegister

module.exports = router;
