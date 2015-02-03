var mT = angular.module("miniTwitter", []);

mT.controller("TweetController", ['$scope', 'Tweet', function($scope, Tweet) {

  $scope.tweet = new Tweet();

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
