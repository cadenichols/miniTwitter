var mT = angular.module("miniTwitter", []);

mT.controller("TweetController", ['$scope', 'Tweet', function($scope, Tweet) {

  $scope.tweet = new Tweet();

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

mT.factory("Tweet", [function() {
  var Tweet = function() {
    this.message = "";
    this.list = [
      { 'text': 'This is the first tweet' },
      { 'text': 'This is the second tweet' },
      { 'text': 'This is the third tweet' },
      { 'text': 'This is the fourth tweet' }
    ];
  };

  Tweet.prototype.tweetLengthOk = function() {
    var length = this.message.length;
    return length > 0 && length <= 140;
  };

  Tweet.prototype.remainingCharacters = function() {
    return 140 -  this.message.length;
  };

  Tweet.prototype.addTweet = function() {
    this.list.push({ text: this.message });
    this.message = "";
  };

  return Tweet;
}]);
