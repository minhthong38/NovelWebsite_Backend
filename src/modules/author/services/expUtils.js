const AuthorExp = require("../../../models/authors/authorExpModel");
const AuthorLevel = require("../../../models/authors/authorLevelModel");
const NotificationService = require("../../user/services/notificationService");

// Cộng EXP và cập nhật level nếu cần
const addExpForAuthor = async (idUser, expEarned) => {
  let authorExp = await AuthorExp.findOne({ idUser });

  if (!authorExp) {
    const level1 = await AuthorLevel.findOne({ level: 1 });
    if (!level1) throw new Error("Không tìm thấy cấp độ 1!");

    authorExp = await AuthorExp.create({
      idUser,
      totalExp: expEarned,
      idLevel: level1._id,
    });

    return authorExp;
  }

  authorExp.totalExp += expEarned;

  const levels = await AuthorLevel.find().sort({ level: -1 });
  for (const lvl of levels) {
    if (authorExp.totalExp >= lvl.requiredExp) {
      if (!authorExp.idLevel.equals(lvl._id)) {
        authorExp.idLevel = lvl._id;
        await NotificationService.createNotification({
          userId: idUser,
          title: "Thăng cấp độ tác giả",
          description: `Bạn đã được thăng lên cấp "${lvl.title}" `,
          link: `/authorAccounts`,
          type: "authorLevel",
      });
      }
      break;
    }
  }

  return await authorExp.save();
};

module.exports = { addExpForAuthor };
