const purchaseService = require('..//service/purchaseHistoryService');

exports.create = async (req, res) => {
  try {
    const newPurchase = await purchaseService.createPurchaseHistory(req.body);
    res.status(201).json(newPurchase);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserPurchases = async (req, res) => {
  try {
    const purchases = await purchaseService.getUserPurchases(req.params.userId);
    res.status(200).json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkPurchased = async (req, res) => {
  try {
    const { userId, chapterId } = req.query;
    const isPurchased = await purchaseService.hasPurchasedChapter(userId, chapterId);
    res.status(200).json({ isPurchased: !!isPurchased });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNovelStats = async (req, res) => {
  try {
    const stats = await purchaseService.getNovelRevenueStats(req.params.novelId);
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
