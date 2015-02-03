var express = require('express');
var gravatar = require('gravatar');
var router = express.Router();

var Tweet = require('../app/models/tweet');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.status(403).json({msg: "please login"});
}

router.post('/tweets', isLoggedIn, function(req, res, next) {
  var newTweet = new Tweet();
  var userEmail = req.user.local.email;
  newTweet.tweetBody = req.body.tweetBody;
  newTweet.createdAt = new Date();
  newTweet.userEmail = userEmail;
  newTweet.gravatarUrl = gravatar.url(userEmail);
  newTweet.save(function(err) {
    if (err) { res.status(500).json(err); }
    res.json(newTweet);
  });
});

router.get('/tweets', function (req, res, next) {
  Tweet.find({}, '', {
    sort: {
      createdAt: -1
    },
    limit: 10
  }, function (err, objects) {
    if (err) {
      throw err;
    }
    res.json(objects);
  });
});

router.delete('/tweets/:id', function (req, res) {
  if (isLoggedIn) {
    var tweetId = req.params.id;
    var query = Tweet.where({
      _id: tweetId
    });
    query.findOne(function (err, tweet) {
      if (err) {
        throw err;
      }
      //    res.json(tweet);
      tweet.remove(function () {
        res.send(200, "Tweet deleted...");
      });
    });
  }
});

module.exports = router;
