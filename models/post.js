var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
			 require('../libs/dateUtil');
var mongoose = require('mongoose');
// Connection URL
var url = 'mongodb://localhost:27017/blog';

var options = {
  db: { native_parser: true },
  server: { poolSize: 5 }
};
mongoose.connect(url, options);

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BlogPost = new Schema({
    author    : ObjectId,
    title     : String,
    body      : String,
    date      : Date
});

mongoose.model('BlogPost', BlogPost);

var BlogPost = mongoose.model('BlogPost');
var markdown = require('markdown').markdown;

exports.postArticle = function (req, res, next) {
	// body...
	console.log(req.body.comment);
	// MongoClient.connect(url, function(err, db) {
	// 	assert.equal(null, err);
	// 	console.log('Connected correctly to server');
	// 	insertComment(req.body.comment);
	// 	db.close();
	// });
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  }

	var blogPost = new BlogPost();
	blogPost.title = req.body.title;
	blogPost.body = req.body.text;
	blogPost.date = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
	blogPost.save(function(err) {
		if (err) {
			console.log(err);
			throw err;
		}
		console.log('Task saved.');
		findBlogPost();
	});

}

function insertComment(db, comment, callback) {
	// var collection = db.collection('comments');
	// collection.insertMany([{
	// 	comment: comment
	// }], function(err, result) {
	// 	assert.equal(null, err);
	// 	assert.equal(1, result.result.n);
	// 	console.log('insert a comment');
	// 	callback(null);
	// });
}

function findBlogPost() {
	BlogPost.find({'title': 'good'}, function(err, posts) {
		for (var i=0; i< posts.length; i++) {
			console.log('ID :' + posts[i]._id);
			console.log(posts[i]);
			//解析 markdown 为 html
			console.log(markdown.toHTML(posts[i].body));
			// docs.forEach(function (doc) {
			//   doc.post = markdown.toHTML(doc.post);
			// });
		}
	});
}

exports.display = function(req, res, next) {

	BlogPost.find({}, function(err, posts) {
		// for (var i=0; i< posts.length; i++) {
		// 	console.log('ID :' + posts[i]._id);
		// 	console.log(posts[i]);
		// 	//解析 markdown 为 html
		// 	console.log(markdown.toHTML(posts[i].body));
		// 	// docs.forEach(function (doc) {
		// 	//   doc.post = markdown.toHTML(doc.post);
		// 	// });
		// }
		console.log(posts);
		res.render('demo', { posts: posts});
	});
	
}