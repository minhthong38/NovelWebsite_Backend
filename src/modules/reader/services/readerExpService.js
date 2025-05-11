const ReaderExp = require("../../../models/readers/readerExpModel");
const ReaderLevel = require("../../../models/readers/readerLevelModel");
const NotificationService = require("../../user/services/notificationService");

//Tự động tạo khi tạo User mới 
const createReaderExp = async (userId) => {
  const existingExp = await ReaderExp.findOne({ idUser: userId });
  if (!existingExp) {
      const defaultLevel = await ReaderLevel.findOne({ level: 1 });
      if (!defaultLevel) throw new Error("Không tìm thấy ReaderLevel mặc định");

      const readerExp = await ReaderExp.create({
          idUser: userId,
          idLevel: defaultLevel._id,
          totalExp: 0, // Bạn có thể khởi tạo EXP ban đầu nếu cần
      });

      console.log(`✅ ReaderExp đã được tạo cho user ${userId}`);
      return readerExp;
  }
};


//Xóa khi User bị xóa
const deleteReaderExp = async (userId) =>{
    try {
        await ReaderExp.deleteOne({ idUser: userId });
        console.log("ReaderExp đã bị xóa!");
    } catch (error) {
        throw new Error("Lỗi khi xóa Reader Experience: " + error.message);
    }
}

// Lấy danh sách tất cả Reader Exp
const getAllReaderExp = async () => {
  try {
    return await ReaderExp.find()
      .populate('idLevel', 'level title')
      .populate('idUser', 'username email'); // 👈 Lấy username và email từ User
  } catch (error) {
    throw new Error("Lỗi khi lấy danh sách ReaderExp: " + error.message);
  }
};

// Lấy Reader Exp theo IDUser
const getReaderExpByUserId = async (userId) => {
  if (!userId) {
    throw new Error("userId là bắt buộc");
  }

  try {
    const readerExp = await ReaderExp.findOne({ idUser: userId })
      .populate('idLevel', 'level title')  // Populate với các trường cần thiết từ ReaderLevel
      .populate('idUser', 'username email'); // Populate với thông tin user

    if (!readerExp) {
      throw new Error(`Không tìm thấy ReaderExp cho userId: ${userId}`);
    }

    return readerExp;
  } catch (error) {
    console.error("Lỗi khi lấy ReaderExp:", error.message);
    throw error;
  }
};


// Lấy thông tin Reader Exp theo ID
const getReaderExpById = async (id) => {
  try {
    const readerExp = await ReaderExp.findById(id)
      .populate('idLevel', 'level title')
      .populate('idUser', 'username email'); // 👈 Lấy username và email từ User

    if (!readerExp) {
      throw new Error("Không tìm thấy ReaderExp.");
    }

    return readerExp;
  } catch (error) {
    throw new Error("Lỗi khi lấy ReaderExp: " + error.message);
  }
};

const addExpToReader = async (userId) => {
  const readerExp = await ReaderExp.findOne({ idUser: userId });

  if (!readerExp) throw new Error("Không tìm thấy ReaderExp");

  // Cộng thêm EXP
  readerExp.totalExp += 10; // Cộng 10 EXP

  // Lấy tất cả các cấp độ ReaderLevel và sắp xếp từ cấp thấp nhất đến cao nhất
  const levels = await ReaderLevel.find().sort({ requiredExp: 1 }); // Sắp xếp từ cấp thấp đến cao

  // Tìm cấp độ phù hợp với tổng EXP mới
  const matchedLevel = levels.filter(level => readerExp.totalExp >= level.requiredExp)
                             .pop(); // Lấy cấp độ cao nhất mà người dùng đã đạt được

  console.log("Matched Level:", matchedLevel);

  // Nếu matchedLevel khác cấp độ hiện tại, cập nhật cấp độ mới
  if (matchedLevel && (!readerExp.idLevel || !readerExp.idLevel.equals(matchedLevel._id))) {
      readerExp.idLevel = matchedLevel._id; // Cập nhật cấp độ
      await NotificationService.createNotification({
          userId: userId,
          title: "Thăng cấp độ độc giả",
          description: `Bạn đã được thăng lên cấp "${matchedLevel.title}" `,
          link: `/userAccount`,
          type: "userLevel",
      });
  }

  console.log("ReaderExp trước khi lưu:", readerExp);
  await readerExp.save();
  console.log("ReaderExp sau khi lưu:", readerExp);

  return readerExp;
};

module.exports = {
    addExpToReader,
    getAllReaderExp, 
    getReaderExpById, 
    getReaderExpByUserId,
    createReaderExp, 
    deleteReaderExp,
};
