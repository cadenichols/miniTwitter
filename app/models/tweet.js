var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;
var tweetSchema = new Schema({
  tweetBody : String,
  userEmail : String,
  gravatarUrl : String,
  createdAt: Date
});

module.exports = mongoose.model('Tweet', tweetSchema);
