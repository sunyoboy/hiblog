var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/plan', function(req, res, next) {
  res.render('plan', { title: 'Plan', page : 2, isFirstPage : false, isLastPage: false });
});

router.get('/current', function(req, res, next) {
  res.render('current', { title: 'current' });
});

router.get('/review', function(req, res, next) {
  res.render('review', { title: 'review' });
});

router.get('/discuss', function(req, res, next) {
  res.render('discuss', { title: 'discuss' });
});

router.get('/resources', function(req, res, next) {
  res.render('resources', { title: 'resources' });
});

module.exports = router;
