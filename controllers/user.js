var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

// Connection URL
// var url = 'mongodb://localhost:27017/blog';

// var options = {
//   db: { native_parser: true },
//   server: { poolSize: 5 }
// };
// mongoose.connect(url, options);

//先创建Schema
var UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  date: Date
});

//通过Schema创建Model
var UserModel = mongoose.model('User',UserSchema);



exports.signup = function(req, res, next) {
	var user = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		date: new Date()
	}
	console.log(user);
	UserModel.create(user);
	res.redirect('/');
	next();
}

exports.signin = function(req, res, next) {
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5'),
      // password = md5.update(req.body.password).digest('hex');
      password = req.body.password;

    UserModel.findOne({'username': req.body.username}, function(err,user){
      //如果err==null，则user就能取到数据
      if (err) {
        console.log(err);
        throw err;
      }

    if (!user) {
      req.flash('error', '用户不存在!'); 
      return res.redirect('/signin');//用户不存在则跳转到登录页
    }
    //检查密码是否一致
    if (user.password != password) {
      req.flash('error', '密码错误!'); 
      return res.redirect('/signin');//密码错误则跳转到登录页
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.user = user;
    req.flash('success', '登陆成功!');
    res.redirect('/');//登陆成功后跳转到主页

    });
}


