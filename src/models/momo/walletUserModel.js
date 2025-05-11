const mongoose = require('mongoose');

const WalletUserSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Liên kết với người dùng
  balance: { type: Number, default: 0 },  // Số dư ví
}, { timestamps: true,collection: "WalletUser" });

const Wallet = mongoose.model('WalletUser', WalletUserSchema);
module.exports = Wallet;
