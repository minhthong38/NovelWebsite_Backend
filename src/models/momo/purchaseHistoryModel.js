const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseHistorySchema = new Schema(
  {
    idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    idNovel: { type: Schema.Types.ObjectId, ref: 'Novel', required: true },
    idChapter: { type: Schema.Types.ObjectId, ref: 'Chapter', required: true },
    purchaseDate: { type: Date, default: Date.now },
    price: { type: Number, required: true },
  },
  { collection: "PurchaseHistory", timestamps: true }
);

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
