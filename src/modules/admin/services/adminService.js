const Admin = require("../../../models/admins/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Xử lý logic login (Kiểm tra thông tin, tạo token khi login thành công)
const loginAdmin = async (email, password) => {
  const emailAdmin = await Admin.findOne({ email });

  if (!emailAdmin) throw new Error("Email không chính xác hoặc không tồn tại!");

  const isMatch = await bcrypt.compare(password, emailAdmin.password);
  if (!isMatch) throw new Error("Mật khẩu không đúng!");

  const token = jwt.sign({ id: emailAdmin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { 
    token, 
    user: { 
      id: emailAdmin._id,
      username: emailAdmin.fullname,
      email: emailAdmin.email,
      gender: emailAdmin.gender,
      role: emailAdmin.role,
    }
  };
};

// Lấy danh sách Admin
const getAllAdmins = async () => {
  return await Admin.find();
};

// Lấy Admin theo ID
const getAdminById = async (id) => {
  return await Admin.findById(id);
};

// Tạo Admin mới
const createAdmin = async ({ username, email, password, gender }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ username, email, password: hashedPassword, gender });
  return await newAdmin.save();
};

// Cập nhật Admin
const updateAdmin = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  return await Admin.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete Admin
const deleteAdmin = async (id) => {
  return await Admin.findByIdAndDelete(id);
};

module.exports = {
  loginAdmin,
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
