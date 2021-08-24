const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
   idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
   },
   file: {
      type: String,
      required: true,
      trim: true,
   },
   typeFile: {
      type: String,
      trim: true,
   },
   createAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('Publication', PublicationSchema);
