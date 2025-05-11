const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId,ref: 'User',required: true },
    title: { type: String, required: true },
    description: { type: String, default: ''},
    link: { type: String, default: ''},
    isRead: { type: Boolean, default: false },
    type: { type: String,
      enum: ['userLevel', 'novel', 'payment', 'authorLevel', 'authorApprove', 'authorReject'],
      default: 'other',
    },
  },{ timestamps: true, collection: 'Notifications' }
);

module.exports = mongoose.model('Notification', notificationSchema);
