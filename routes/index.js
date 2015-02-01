var express = require('express');
var router = express.Router();

var Tweet = require('../app/models/tweet');

router.post('/tweets', function(req, res, next) {
  var newTweet = new Tweet();
  newTweet.tweetBody = req.body.tweet;
  newTweet.createdAt = new Date();
  newTweet.save(function(err) {
    if (err) { throw err; }
    res.json(newTweet);
  });
});

module.exports = router;
