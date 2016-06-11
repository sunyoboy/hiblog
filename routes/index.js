
var post = require('../controllers/post');
var user = require('../controllers/user');

module.exports = function(app) {
/* GET home page. */
app.get('/', post.display);

app.get('/plan', function(req, res, next) {
  res.render('plan', { title: 'Plan', user: req.session.user});
});

app.get('/current', function(req, res, next) {
  res.render('current', { title: 'current', user: req.session.user });
});

app.get('/review', function(req, res, next) {
  res.render('review', { title: 'review', user: req.session.user});
});

app.get('/discuss', function(req, res, next) {
  res.render('discuss', { title: 'discuss', user: req.session.user });
});

app.get('/resources', function(req, res, next) {
  res.render('resources', { title: 'resources', user: req.session.user });
});

app.get('/post', function(req, res, next) {
  res.render('post', { title: 'resources', user: req.session.user });
});


app.post('/post', post.postArticle);

app.get('/demo', post.display);

app.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'current' });
});

app.post('/signin', user.signin);


app.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'current' });
});

app.post('/signup', user.signup);

app.get('/u/:name', post.getAll);
app.get('/u/:name/:day/:title', post.findOne);

}
