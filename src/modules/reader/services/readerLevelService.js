const ReaderLevel = require("../../../models/readers/readerLevelModel");

// Lấy tất cả ReaderLevel
const getAll = () => {
  return ReaderLevel.find().sort({ level: 1 });
};

// Lấy ReaderLevel theo ID
const getById = (id) => {
  return ReaderLevel.findById(id);
};

// Tạo ReaderLevel mới
const create = (data) => {
  const newLevel = new ReaderLevel(data);
  return newLevel.save();
};

// Cập nhật ReaderLevel
const update = (id, data) => {
  return ReaderLevel.findByIdAndUpdate(id, data, { new: true });
};

// Xoá ReaderLevel
const remove = (id) => {
  return ReaderLevel.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
