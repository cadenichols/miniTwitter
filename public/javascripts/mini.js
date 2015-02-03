var mT = angular.module("miniTwitter", []);
var User = require('../app/models/user');
var passport = require('passport');

mT.controller("TweetController", ['$scope', '$http', function($scope, $http) {
  $scope.tweet = "";

  $scope.tweets = [];

  $http.get('/tweets').success(function(res) {
    $scope.tweets = res;
  }). error(function(res) {
    alert("You suck at coding");
  });

  $scope.addTweet = function() {
    $http.post('/tweets', { tweetBody: $scope.tweet }).then(function(res) {
      console.log("Tweet sent");
      console.log(res);
      $scope.tweets.push(res.data);
    }).catch(function(err) {
      console.log(err);
    });
    $scope.tweet = "";
  }

  $scope.deleteTweet = function(tweet) {
    $http.delete('/tweets/' + tweet._id, tweet).success(function() {
      console.log("Tweet deleted...");
      var index = $scope.tweets.indexOf(tweet);
      $scope.tweets.splice(index,1);
    }).error(function() {
      console.log("Cannot delete...");
    });
  }

  $scope.tweetLengthOk = function() {
    return $scope.tweet.length > 0 && $scope.tweet.length <= 140;
  };

  $scope.remainingCharacters = function() {
    return 140 - $scope.tweet.length;
  };

}]);
