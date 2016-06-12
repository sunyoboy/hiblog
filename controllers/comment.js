var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

//先创建Schema
var CommentSchema = new Schema({
  author: String,
  date: String,
  title: String,
  commit: String
});

//通过Schema创建Model
var CommentModel = mongoose.model('Comment',CommentSchema);

exports.postComment = function(req, res, next) {
	var commit = {
		commit: req.body.commit,
	}
	CommentModel.create(user);
}
	