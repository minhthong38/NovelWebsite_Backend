const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  coinsReceived: { type: Number, required: true },
  orderInfo: { type: String, required: true },
  transactionStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  orderId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
}, { collection: "Transactions" });


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
