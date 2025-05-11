const mongoose = require('mongoose');

const ipnTransactionSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  transStatus: {
    type: String,  // 0: Thành công, 1: Thất bại, v.v.
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Giả sử bạn có User schema để liên kết với người dùng
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const IpTransaction = mongoose.model('IpTransaction', ipnTransactionSchema);

module.exports = IpTransaction;
