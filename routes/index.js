
module.exports = function(app) {
/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.get('/plan', function(req, res, next) {
  res.render('plan', { title: 'Plan', page : 2, isFirstPage : false, isLastPage: false });
});

app.get('/current', function(req, res, next) {
  res.render('current', { title: 'current' });
});

app.get('/review', function(req, res, next) {
  res.render('review', { title: 'review' });
});

app.get('/discuss', function(req, res, next) {
  res.render('discuss', { title: 'discuss' });
});

app.get('/resources', function(req, res, next) {
  res.render('resources', { title: 'resources' });
});

}
