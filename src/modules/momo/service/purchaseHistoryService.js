const PurchaseHistory = require('../../../models/momo/purchaseHistoryModel');

exports.createPurchaseHistory = async (data) => {
  return await PurchaseHistory.create(data);
};

exports.getUserPurchases = async (userId) => {
  return await PurchaseHistory.find({ idUser: userId })
    .populate('idUser', 'fullname avatar')
    .populate('idNovel', 'title')
    .populate('idChapter', 'title order');
};

exports.hasPurchasedChapter = async (userId, chapterId) => {
  return await PurchaseHistory.exists({ idUser: userId, idChapter: chapterId });
};

exports.getPurchaseByUserAndChapter = async (userId, chapterId) => {
  return await PurchaseHistory.findOne({ idUser: userId, idChapter: chapterId });
};
// lấy thống kê doanh thu của tiểu thuyết
exports.getNovelRevenueStats = async (novelId) => {
  const purchases = await PurchaseHistory.find({ idNovel: novelId });
  
  const totalAmount = purchases.reduce((sum, purchase) => sum + (purchase.price || 0), 0);
  const uniqueChapters = new Set(purchases.map(p => p.idChapter.toString())).size;
  const purchaseCount = purchases.length;

  return {
    totalAmount,
    uniqueChapters,
    purchaseCount,
    purchases
  };
};
