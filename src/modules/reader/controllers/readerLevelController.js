const readerLevelService = require("../services/readerLevelService");

// [GET] Lấy tất cả ReaderLevels
exports.getAllReaderLevels = async (req, res) => {
  const levels = await readerLevelService.getAll();
  res.json(levels);
};

// [GET] Lấy ReaderLevel theo ID
exports.getReaderLevelById = async (req, res) => {
  const level = await readerLevelService.getById(req.params.id);
  if (!level) return res.status(404).json({ message: "Không tìm thấy ReaderLevel" });
  res.json(level);
};

// [POST] Tạo ReaderLevel mới
exports.createReaderLevel = async (req, res) => {
  const newLevel = await readerLevelService.create(req.body);
  res.status(201).json(newLevel);
};

// [PUT] Cập nhật ReaderLevel
exports.updateReaderLevel = async (req, res) => {
  const updated = await readerLevelService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Không tìm thấy ReaderLevel để cập nhật" });
  res.json(updated);
};

// [DELETE] Xoá ReaderLevel
exports.deleteReaderLevel = async (req, res) => {
  const deleted = await readerLevelService.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Không tìm thấy ReaderLevel để xoá" });
  res.json({ message: "Xoá ReaderLevel thành công" });
};
