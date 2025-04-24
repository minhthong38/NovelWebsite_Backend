const ReaderExp = require("../../../models/readers/readerExpModel");
const ReaderLevel = require("../../../models/readers/readerLevelModel");

//Tự động tạo khi tạo User mới 
const createReaderExp = async (userId) => {
    const existingExp = await ReaderExp.findOne({ idUser: userId });
    if (!existingExp) {
      // Lấy ReaderLevel mặc định (level 1)
      const defaultLevel = await ReaderLevel.findOne({ level: 1 });
      if (!defaultLevel) throw new Error("Không tìm thấy ReaderLevel mặc định");
  
      await ReaderExp.create({
        idUser: userId,
        idLevel: defaultLevel._id,
      });
  
      console.log(`✅ ReaderExp đã được tạo cho user ${userId}`);
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
      .populate('idLevel', 'level title')
      .populate('idUser', 'username email');

    if (!readerExp) {
      throw new Error("Không tìm thấy ReaderExp cho userId đã cho");
    }

    return readerExp;
  } catch (error) {
    console.error("Lỗi khi lấy ReaderExp theo userId:", error.message);
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

  // Lấy tất cả các cấp độ ReaderLevel và sắp xếp từ cấp cao nhất
  const levels = await ReaderLevel.find().sort({ expRequired: -1 });

  // Tìm cấp độ phù hợp với tổng EXP mới
  const matchedLevel = levels.find(level => readerExp.totalExp >= level.expRequired);

  if (matchedLevel && (!readerExp.idLevel || !readerExp.idLevel.equals(matchedLevel._id))) {
      readerExp.idLevel = matchedLevel._id;
  }

  // Lưu lại ReaderExp mới với EXP và cấp độ đã cập nhật
  await readerExp.save();
  return readerExp;
};


  const addExpWhenReadChapter = async (userId) => {
    const expEarned = 10; // Auto +10 exp
  
    // Tìm hoặc tạo ReaderExp
    let readerExp = await ReaderExp.findOne({ idUser: userId });
    if (!readerExp) {
      readerExp = await ReaderExp.create({ idUser: userId, totalExp: 0, level: 1 });
    }
  
    // Cộng EXP
    readerExp.totalExp += expEarned;
  
    // Lấy bảng cấp độ và cập nhật nếu đủ điều kiện
    const levels = await ReaderLevel.find().sort({ level: -1 });
    for (const lvl of levels) {
      if (readerExp.totalExp >= lvl.requiredExp) {
        readerExp.level = lvl.level;
        break;
      }
    }
  
    await readerExp.save();
    return readerExp;
  };

module.exports = {
    addExpToReader,
    getAllReaderExp, 
    getReaderExpById, 
    getReaderExpByUserId,
    createReaderExp, 
    deleteReaderExp,
    addExpWhenReadChapter
};
