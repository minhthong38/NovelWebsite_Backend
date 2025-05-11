const jwt = require("jsonwebtoken");
const config = require("../config/env");
const User = require("../models/users/userModel");

// Middleware xác thực JWT
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    // Kiểm tra nếu token không tồn tại
    if (!token) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Kiểm tra định dạng token hợp lệ (Bearer <token>)
    if (!token.startsWith("Bearer ")) {
      return res.status(400).json({ message: "Invalid token format." });
    }

    const decoded = jwt.verify(token.replace("Bearer ", ""), config.JWT_SECRET);
    
    // Lấy thông tin người dùng từ token
    req.user = await User.findById(decoded.id).select("id role"); // Chỉ lấy những gì cần thiết

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    next();  // Tiến hành xử lý tiếp theo nếu xác thực thành công
  } catch (error) {
    // Nếu có lỗi trong quá trình xác thực, trả về lỗi 401
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired." });
    }
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Middleware kiểm tra quyền truy cập (Role-based authorization)
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden. You do not have permission." });
    }
    next();  // Nếu người dùng có quyền, tiếp tục xử lý
  };
};

module.exports = { authMiddleware, authorize };
