const express = require("express");
const route = express.Router();
const adminController = require("../controllers/adminController");
const { authMiddleware, authorize } = require("../../../middlewares/authMiddleware");

//Xử lý login admin
route.post("/login", adminController.loginAdmin);

// Lấy toàn bộ danh sách Admin
route.get("/",  adminController.getAllAdmin);

// Thêm mới Admin
route.post("/", adminController.createAdmin);

// Lấy thông tin Admin dựa trên Id
route.get("/:id",  adminController.getAdminById);

// Cập nhật thông tin Admin
route.put("/:id",  adminController.updateAdminById);

// Xóa thông tin Admin
route.delete("/:id",  adminController.deleteAdminById);

module.exports = route;
