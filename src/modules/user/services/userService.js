const User = require("../../../models/users/userModel");
const ReaderExpService = require("../../reader/services/readerExpService");
const AuthorExpService = require("../../author/services/authorExpService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Lấy thông tin người dùng hiện tại
const getCurrentUser = async (userId) => {
  try {
    const user = await User.findById(userId);  // Tìm người dùng từ database
    if (!user) {
      throw new Error('User not found');
    }
    // Trả về dữ liệu người dùng mà không có mật khẩu
    const { password, ...userData } = user.toObject();
    return userData;
  } catch (err) {
    throw err;
  }
};

// Xử lý logic login (Kiểm tra thông tin, tạo token khi login thành công)
const loginUser = async (email, password) => {
  const emailUser = await User.findOne({ email });

  if (!emailUser) throw new Error("Email không chính xác hoặc không tồn tại!");

  const isMatch = await bcrypt.compare(password, emailUser.password);
  if (!isMatch) throw new Error("Mật khẩu không đúng!");

  const token = jwt.sign({ id: emailUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return { 
    token, 
    user: { 
      id: emailUser._id,
      fullname: emailUser.fullname,
      username: emailUser.username,
      email: emailUser.email,
      gender: emailUser.gender,
      role: emailUser.role,
      avatar: emailUser.avatar
    }
  };
};

// Lấy danh sách User & tự động tạo ReaderExp nếu thiếu
const getUsers = async () => {
  const users = await User.find({});
  
  for (const user of users) {
    await ReaderExpService.createReaderExp(user._id);
    await AuthorExpService.createAuthorExp(user._id);
  }

  return users;
};


// Thêm User mới
const addUser = async (userData, avatarUrl) => {
  try {
    const { fullname, username, password, email, gender } = userData;

    if (!fullname || !username || !password || !email || !gender) {
      throw new Error("Vui lòng điền đầy đủ thông tin");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email đã tồn tại");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Khi tạo User mới, gán avatar URL (nếu có)
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      email,
      gender,
      avatar: avatarUrl || "https://via.placeholder.com/150", // Nếu không có ảnh, dùng ảnh mặc định
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw new Error("Lỗi server, không thể đăng ký");
  }
};

// Xóa User theo ID (xóa luôn ReaderExp và AuthorExp nếu có)
const deleteUserById = async (id) => {
  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      await ReaderExpService.deleteReaderExp(id);
      await AuthorExpService.deleteAuthorExp(id);
      console.log(`User ${id} và dữ liệu liên quan đã bị xóa.`);
    }
    return user;
  } catch (error) {
    throw error;
  }
};


// Cập nhật User theo ID
const updateUserById = async (id, updateData, avatarUrl) => {
  // Nếu có URL avatar mới, cập nhật avatar trong updateData
  if (avatarUrl) {
    updateData.avatar = avatarUrl;
  }

  const user = await User.findByIdAndUpdate(id, updateData, { new: true });

  if (!user) {
    throw new Error("User không tồn tại");
  }

  return user;
};


module.exports = {
  getCurrentUser,
  loginUser,
  getUsers,
  addUser,
  deleteUserById,
  updateUserById,
};
