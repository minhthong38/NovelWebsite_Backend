const adminService = require("../services/adminService");

// Xử lý login (Nhận email và password từ req đưa sang service xử lý logic)
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await adminService.loginAdmin(email, password);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách tất cả Admin
const getAllAdmin = async (req, res) => {
  try {
    const admins = await adminService.getAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách Admin", error });
  }
};

// Lấy thông tin Admin theo ID
const getAdminById = async (req, res) => {
  try {
    const admin = await adminService.getAdminById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin không tồn tại" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy Admin", error });
  }
};

// Tạo Admin mới
const createAdmin = async (req, res) => {
  try {
    const newAdmin = await adminService.createAdmin(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo Admin", error });
  }
};

// Cập nhật Admin
const updateAdminById = async (req, res) => {
  try {
    const updatedAdmin = await adminService.updateAdmin(req.params.id, req.body);
    if (!updatedAdmin) return res.status(404).json({ message: "Admin không tồn tại" });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật Admin", error });
  }
};

// Delete Admin
const deleteAdminById = async (req, res) => {
  try {
    const deletedAdmin = await adminService.deleteAdmin(req.params.id);
    if (!deletedAdmin) return res.status(404).json({ message: "Admin không tồn tại" });
    res.status(200).json({ message: "Xóa Admin thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa Admin", error });
  }
};

module.exports = {
  loginAdmin,
  getAllAdmin,
  getAdminById,
  createAdmin,
  updateAdminById,
  deleteAdminById,
};
