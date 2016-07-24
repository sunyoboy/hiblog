var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var logger = config.getLogger('app');

// added by sunlj
var upload = require('./libs/upload');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var routes = require('./routes/index');

var app = express();

app.set('port', process.env.PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

// save session in mongodb
app.use(session({
  secret: config.mongodb.cookieSecret,
  key: config.mongodb.db, // cookie name
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days 
  },
  store: new MongoStore({
    url: 'mongodb://localhost/blog'
      // db: config.db,
      // host: config.host,
      // port: config.port
  }),
  resave: false,
  saveUninitialized: true
}));

routes(app);

upload.upload(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 导出app实例供其他模块调用。
module.exports = app;

/*设置监听端口,同时设置回调函数，监听到事件时执行回调函数*/
app.listen(app.get('port'), function afterListen() {
  console.log('express running on the http://localhost:' + app.get('port'));
});