const authorLevelService = require("../services/authorLevelService");

// [GET] Lấy tất cả AuthorLevels
exports.getAllAuthorLevels = async (req, res) => {
  const levels = await authorLevelService.getAll();
  res.json(levels);
};

// [GET] Lấy AuthorLevel theo ID
exports.getAuthorLevelById = async (req, res) => {
  const level = await authorLevelService.getById(req.params.id);
  if (!level) return res.status(404).json({ message: "Không tìm thấy AuthorLevel" });
  res.json(level);
};

// [POST] Tạo AuthorLevel mới
exports.createAuthorLevel = async (req, res) => {
  const newLevel = await authorLevelService.create(req.body);
  res.status(201).json(newLevel);
};

// [PUT] Cập nhật AuthorLevel
exports.updateAuthorLevel = async (req, res) => {
  const updated = await authorLevelService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Không tìm thấy AuthorLevel để cập nhật" });
  res.json(updated);
};

// [DELETE] Xoá AuthorLevel
exports.deleteAuthorLevel = async (req, res) => {
  const deleted = await authorLevelService.remove(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Không tìm thấy AuthorLevel để xoá" });
  res.json({ message: "Xoá AuthorLevel thành công" });
};
