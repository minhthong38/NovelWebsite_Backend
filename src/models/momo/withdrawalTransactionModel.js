const mongoose = require('mongoose');

const withdrawalTransactionSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  amount: {type: Number,required: true,min: 10000 },
  status: {type: String,enum: ['pending', 'approved', 'rejected'],default: 'pending'},
  method: {type: String,enum: ['momo'],required: true},
  accountInfo: {type: String,required: true, default: 'MomoAccount'},
  note: {type: String ,default: 'Chưa có ghi chú'}
},{timestamps: true,collection: "WithdrawalTransaction"}); 

module.exports = mongoose.model('WithdrawalTransaction', withdrawalTransactionSchema);
