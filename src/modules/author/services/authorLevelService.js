const AuthorLevel = require("../../../models/authors/authorLevelModel");

// Lấy tất cả AuthorLevel
const getAll = () => {
  return AuthorLevel.find().sort({ level: 1 });
};

// Lấy AuthorLevel theo ID
const getById = (id) => {
  return AuthorLevel.findById(id);
};

// Tạo AuthorLevel mới
const create = (data) => {
  const newLevel = new AuthorLevel(data);
  return newLevel.save();
};

// Cập nhật AuthorLevel
const update = (id, data) => {
  return AuthorLevel.findByIdAndUpdate(id, data, { new: true });
};

// Xoá AuthorLevel
const remove = (id) => {
  return AuthorLevel.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
