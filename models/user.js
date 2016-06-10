var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    author    : String,
    title     : String,
    body      : String,
    date      : Date
});

var post = new Schema({
    author    : String,
    title     : String,
    body      : String,
    date      : Date
});

exports.getAll = function (req, res, next) {

}

exports.findOne = function (req, res, next) {

}