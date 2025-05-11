const notificationService = require('../services/notificationService');

// Tạo thông báo mới
const createNotification = async (req, res) => {
  try {
    const { userId, title, description, link, type } = req.body;

    const notification = await notificationService.createNotification({
      userId,
      title,
      description,
      link,
      type,
    });

    res.status(201).json({ message: 'Thông báo đã được tạo thành công', data: notification });
  } catch (error) {
    console.error("Lỗi khi tạo thông báo:", error);
    res.status(500).json({ message: error.message || "Lỗi server khi tạo thông báo" });
  }
};



// Lấy danh sách thông báo của người dùng
const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Lấy danh sách thông báo của người dùng ${userId}`);

    // Gọi service để lấy danh sách thông báo
    const notifications = await notificationService.getNotificationsByUser(userId);

    // Trả về danh sách thông báo
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Lỗi khi lấy thông báo:", error);
    // Trả về lỗi nếu có sự cố
    res.status(500).json({ message: "Lỗi server khi lấy thông báo" });
  }
};

// Đánh dấu thông báo là đã đọc
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Đánh dấu thông báo ${id} là đã đọc`);

    // Gọi service để cập nhật trạng thái thông báo
    const updatedNotification = await notificationService.markAsRead(id);

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Không tìm thấy thông báo' });
    }

    // Trả về thông báo đã cập nhật thành công
    res.status(200).json({
      message: 'Thông báo đã được đánh dấu là đã đọc',
      updatedNotification,
    });
  } catch (error) {
    console.error("Lỗi khi đánh dấu thông báo:", error);
    // Trả về lỗi nếu có sự cố
    res.status(500).json({ message: "Lỗi server khi đánh dấu thông báo" });
  }
};

// Xóa thông báo
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Xóa thông báo:", id);

    await notificationService.deleteNotification(id);
    res.status(200).json({ message: "Xóa thông báo thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa thông báo:", error);
    res.status(500).json({ message: "Lỗi server khi xóa thông báo" });
  }
};
module.exports = {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification
};
