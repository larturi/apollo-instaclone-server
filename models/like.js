const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('Like', LikeSchema);
