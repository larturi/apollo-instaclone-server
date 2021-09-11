const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema({
   idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
   },
   follow: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Follow', FollowSchema);
