var mT = angular.module("miniTwitter", []);

mT.controller("TweetController", ['$scope', 'Tweet', function($scope, Tweet) {

  $scope.tweet = new Tweet();

  $scope.addTweet = function() {
    $scope.tweets.push({ text: $scope.tweet });
    $scope.tweet = "";
  };

  $scope.tweetLengthOk = function() {
    return $scope.tweet.length > 0 && $scope.tweet.length <= 140;
  };

  $scope.remainingCharacters = function() {
    return 140 - $scope.tweet.length;
  };
}]);


mT.factory("Tweet", [function() {
  var Tweet = function() {
    this.newTweet = "";
    this.list = [
      { 'text': 'This is the first tweet' },
      { 'text': 'This is the second tweet' },
      { 'text': 'This is the third tweet' },
      { 'text': 'This is the fourth tweet' }
    ];
  };

  return Tweet;
}]);



