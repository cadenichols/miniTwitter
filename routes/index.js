var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/tweets', function(req, res, next) {
  var date = new Date();
  res.json({ date: date });
});

module.exports = router;
