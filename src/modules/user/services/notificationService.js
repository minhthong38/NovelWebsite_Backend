const Notification = require('../../../models/users/notificationModel');
const User = require('../../../models/users/userModel');

// Tạo thông báo
const createNotification = async ({ userId, title, description, link, type }) => {
  try {
    // Kiểm tra sự tồn tại của người dùng
    const userExists = await User.findById(userId);
    if (!userExists) {
      throw new Error("Người dùng không tồn tại.");
    }

    // Tạo thông báo mới
    const notification = new Notification({
      userId,
      title,
      description,
      link,
      type,
    });

    await notification.save();
    return notification;  // Trả về thông báo vừa được tạo
  } catch (error) {
    console.error("Lỗi khi tạo thông báo:", error);  // Ghi lại lỗi chi tiết
    throw new Error('Lỗi khi tạo thông báo: ' + error.message);  // Thông báo lỗi chi tiết
  }
};

// Lấy tất cả thông báo của người dùng
const getNotificationsByUser = async (userId) => {
  try {
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    throw new Error('Lỗi khi lấy thông báo');
  }
};

// Đánh dấu thông báo là đã đọc
const markAsRead = async (notificationId) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
    return updatedNotification;
  } catch (error) {
    throw new Error('Lỗi khi đánh dấu thông báo là đã đọc');
  }
};

const deleteNotification = async (notificationId) => {
    try {
      await Notification.findByIdAndDelete(notificationId);
    } catch (error) {
      throw new Error('Lỗi khi xóa thông báo');
    }
  };

module.exports = {
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification
};
