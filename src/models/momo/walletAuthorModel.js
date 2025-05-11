const mongoose = require('mongoose');

const WalletAuthorSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,unique: true},
    totalRevenue: {type: Number,default: 0, min: 0},
    monthlyRevenue: {type: Map,of: Number,default: {} }, // Ví dụ: { '2025-04': 15000, '2025-03': 8200 }
    lastUpdated: {type: Date, default: Date.now
    }
  }, { timestamps: true,collection: "WalletAuthor" });

const Wallet = mongoose.model('WalletAuthor', WalletAuthorSchema);
module.exports = Wallet;
  