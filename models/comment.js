const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
   idPublication: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Publication',
   },
   idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
   },
   comment: {
      type: String,
      required: true,
      trim: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Comment', CommentSchema);
