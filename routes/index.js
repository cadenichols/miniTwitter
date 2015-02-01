var express = require('express');
var gravatar = require('gravatar');
var router = express.Router();

var Tweet = require('../app/models/tweet');

router.post('/tweets', function(req, res, next) {
  var newTweet = new Tweet();
  var userEmail = req.user.local.email;
  newTweet.tweetBody = req.body.tweet;
  newTweet.createdAt = new Date();
  newTweet.userEmail = userEmail;
  newTweet.gravatarUrl = gravatar.url(userEmail);
  newTweet.save(function(err) {
    if (err) { throw err; }
    res.json(newTweet);
  });
});

module.exports = router;
