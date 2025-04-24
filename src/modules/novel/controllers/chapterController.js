const chapterService = require("../services/chapterService");

/**
 * Thêm Chapter mới
 */
const addChapter = async (req, res) => {
    try {
      const result = await chapterService.addChapter(req.body);
      res.status(201).json({ success: true, message: "Chapter created successfully", data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  

/**
 * Lấy tất cả Chapters
 */
const getChapters = async (req, res) => {
    try {
        const chapters = await chapterService.getChapters();
        res.status(200).json({ success: true, data: chapters });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//Lấy Ds chapter theo Novel
const getChaptersByNovelId = async (req, res) => {
    try {
        const { idNovel } = req.params;
        const chapters = await chapterService.getChaptersByNovelId(idNovel);
        res.status(200).json({ success: true, data: chapters });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Lấy Chapter theo ID
 */
const getChapterById = async (req, res) => {
    try {
        const { id } = req.params;
        const chapter = await chapterService.getChapterById(id);
        res.status(200).json({ success: true, data: chapter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Cập nhật Chapter theo ID
 */
const updateChapterById = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedChapter = await chapterService.updateChapterById(id, updateData);
        res.status(200).json({ success: true, data: updatedChapter });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * Xóa Chapter theo ID
 */
const deleteChapterById = async (req, res) => {
    try {
        const { id } = req.params;
        await chapterService.deleteChapterById(id);
        res.status(200).json({ success: true, message: "Chapter đã bị xóa." });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { addChapter, getChapters, getChapterById, getChaptersByNovelId, updateChapterById, deleteChapterById };
