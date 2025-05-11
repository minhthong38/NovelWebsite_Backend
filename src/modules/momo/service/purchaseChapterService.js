const WalletUser = require('../../../models/momo/walletUserModel');
const WalletAuthor = require('../../../models/momo/walletAuthorModel');
const Chapter = require('../../../models/novels/chapterModel');
const Novel = require('../../../models/novels/novelModel');

async function purchaseChapter(userId, idChapter, price) {
  const session = await WalletUser.startSession();
  session.startTransaction();

  try {
    // Lấy chapter và truy ngược đến author
    const chapter = await Chapter.findById(idChapter).populate('idNovel');
    if (!chapter) throw new Error('Chapter không tồn tại');

    const novel = chapter.idNovel;
    const authorId = novel.idUser;

    if (!authorId) throw new Error('Chapter không có author');

    // Trừ tiền user
    const mongoose = require('mongoose');

    const userWallet = await WalletUser.findOne({ userId: new mongoose.Types.ObjectId(userId) });

  
    if (!userWallet || Number(userWallet.balance) < Number(price)) {
      throw new Error('Số dư không đủ');
    }
    
    userWallet.balance -= price;
    await userWallet.save({ session });

    console.log('Raw authorId:', authorId);
    console.log('Type of authorId:', typeof authorId);
    console.log('authorId instanceof ObjectId:', authorId instanceof mongoose.Types.ObjectId);

  
    const COIN_TO_VND = 5000;
    const amountInVND = price * COIN_TO_VND;
    // Cộng tiền vào ví author
    const authorWallet = await WalletAuthor.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(authorId) },
      {
        $inc: {
          totalRevenue: amountInVND,
          [`monthlyRevenue.${new Date().toISOString().slice(0, 7)}`]: amountInVND
        },
        lastUpdated: new Date()
      },
      { new: true, session }
    );
    console.log("Author wallet:", authorWallet); // Log ví tác giả để kiểm tra
    
    if (!authorWallet) throw new Error('Không tìm thấy ví tác giả');

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    return { success: true, message: 'Mua thành công' };

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: error.message };
  }
}

module.exports = { purchaseChapter };
