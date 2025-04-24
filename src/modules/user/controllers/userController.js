const userService = require("../services/userService");

// Lấy thông tin người dùng hiện tại
const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;  // Giả sử bạn đã xác thực và gán user vào req.user
    const userData = await userService.getCurrentUser(userId);  // Gọi service

    return res.json(userData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Xử lý login (Nhận email và password từ req đưa sang service xử lý logic)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.loginUser(email, password);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy danh sách User
const getUser = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Thêm User mới
const addUser = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ hoặc rỗng" });
    }

    const file = req.files?.[0]; // lấy file đầu tiên nếu có
    const avatarUrl = file ? file.path : undefined;

    const newUser = await userService.addUser(req.body, avatarUrl);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Lỗi khi thêm user:", error);
    res.status(500).json({ message: error.message });
  }
};

// Xóa User theo ID
const deleteUserById = async (req, res) => {
  try {
    await userService.deleteUserById(req.params.id);
    res.status(200).json({ message: "Xóa user thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa user", error });
  }
};

// Cập nhật User theo ID
const updateUserById = async (req, res) => {
  try {
    // Kiểm tra nếu có file ảnh mới
    const file = req.files?.[0];
    const avatarUrl = file ? file.path : undefined;

    // Cập nhật người dùng với avatar mới (nếu có)
    const updatedUser = await userService.updateUserById(req.params.id, req.body, avatarUrl);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật user", error });
  }
};


module.exports = {
  getCurrentUser,
  loginUser,
  getUser,
  addUser,
  deleteUserById,
  updateUserById,
};
