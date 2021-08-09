const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      trim: true,
   },
   avatar: {
      type: String,
      trim: true,
   },
   siteWeb: {
      type: String,
      trim: true,
   },
   bio: {
      type: String,
      trim: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model('User', UserSchema);
