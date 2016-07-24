var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');
var dateUtil = require('../libs/dateUtil');
var mongoose = require('mongoose');
var crypto = require('crypto');

// Connection URL
var url = 'mongodb://localhost:27017/blog';

var options = {
  db: {
    native_parser: true
  },
  server: {
    poolSize: 5
  }
};
mongoose.connect(url, options);

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var BlogPost = new Schema({
  username: String,
  title: String,
  body: String,
  date: {},
  comments: []
});



var BlogPost = mongoose.model('BlogPost', BlogPost);
var markdown = require('markdown').markdown;

var Comment = new Schema({
  name: String,
  head: String,
  email: String,
  website: String,
  time: {},
  content: String
});
var CommentModel = mongoose.model('Comment', Comment);

exports.postArticle = function(req, res, next) {
  // body...
  // MongoClient.connect(url, function(err, db) {
  //  assert.equal(null, err);
  //  console.log('Connected correctly to server');
  //  insertComment(req.body.comment);
  //  db.close();
  // });


  var blogPost = new BlogPost();
  blogPost.username = req.session.user.username;
  blogPost.title = req.body.title;
  blogPost.body = req.body.text;
  blogPost.date = dateUtil.getDateTime(); // (new Date()).Format("yyyy-MM-dd hh:mm:ss");
  blogPost.save(function(err) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('Task saved.');
    findBlogPost();
  });
  res.redirect('/');

}

function insertComment(db, comment, callback) {
  // var collection = db.collection('comments');
  // collection.insertMany([{
  //  comment: comment
  // }], function(err, result) {
  //  assert.equal(null, err);
  //  assert.equal(1, result.result.n);
  //  console.log('insert a comment');
  //  callback(null);
  // });
}

function findBlogPost() {
  BlogPost.find({
    'title': 'good'
  }, function(err, posts) {
    for (var i = 0; i < posts.length; i++) {
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
    //  console.log('ID :' + posts[i]._id);
    //  console.log(posts[i]);
    //  //解析 markdown 为 html
    //  console.log(markdown.toHTML(posts[i].body));
    //  // docs.forEach(function (doc) {
    //  //   doc.post = markdown.toHTML(doc.post);
    //  // });
    // }
    console.log(posts);
    posts.forEach(function(doc) {
      doc.body = markdown.toHTML(doc.body);
    });
    res.render('index', {
      posts: posts,
      user: req.session.user
    });
  });

  var query = {};
  var page = 0;
  if (!req.query.page) {
    page = 1;
  } else {
    page = req.query.page;
  }
  //使用 count 返回特定查询的文档数 total
  //
  // var query = BlogPost.find({});
  // query.limit(2); //限制条数
  // query.skip((page - 1) * 10) //开始数 ，通过计算可是实现分页  
  // query.exec(function(err, docs) {
  //   console.log(docs);
  // });



}

exports.getTen = function(req, res, next) {
  BlogPost.count({}, function(err, count) {
    if (err) {
      console.log(err);
    }
    console.log('there are %d jungle adventures', count);
    var query = BlogPost.find({});
    var page = 0;
    if (!req.query.page) {
      page = 1;
    } else {
      page = parseInt(req.query.page);
    }
    query.limit(2); //限制条数
    query.skip((page - 1) * 2) //开始数 ，通过计算可是实现分页  
    query.exec(function(err, posts) {
      console.log('getTen posts ');
      console.log(posts);
      posts.forEach(function(doc) {
        doc.body = markdown.toHTML(doc.body);
      });
      res.render('index', {
        posts: posts,
        user: req.session.user,
        page: page,
        isFirstPage: (page - 1) == 0,
        isLastPage: ((page-1) * 2 + posts.length) == count
      });
    });
  });


}

exports.getAll = function(req, res, next) {
  console.log(req.params.name);
  BlogPost.find({
    'username': req.params.name
  }, function(err, posts) {
    //如果err==null，则user就能取到数据
    if (err) {
      console.log(err);
      throw err;
    }

    posts.forEach(function(doc) {
      if (doc) {
        doc.body = markdown.toHTML(doc.body);
        doc.comments.forEach(function(comment) {
          comment.content = markdown.toHTML(comment.content);
        });
      }

    });

    res.render('index', {
      posts: posts,
      user: req.session.user
    });

  });
}

exports.findOne = function(req, res, next) {
  console.log({
    'username': req.params.name,
    'title': req.params.title,
    'date.day': req.params.day
  });

  BlogPost.find({
    'username': req.params.name,
    'title': req.params.title,
    'date.day': req.params.day
  }, function(err, blogs) {
    //如果err==null，则user就能取到数据
    if (err) {
      console.log(err);
      throw err;
    }
    res.render('index', {
      posts: blogs,
      user: req.session.user
    });

  });
}

exports.checkLogin = function(req, res, next) {
  if (req.session.user) {

  } else {
    res.redirect('/signin');
  }
  next();
}

exports.editArticle = function(req, res, next) {
  BlogPost.findOne({
    'username': req.params.name,
    'title': req.params.title,
    'date.day': req.params.day
  }, function(err, article) {
    //如果err==null，则user就能取到数据
    if (err) {
      console.log(err);
      throw err;
    }
    res.render('edit', {
      article: article,
      user: req.session.user
    });

  });
}

exports.updateArticle = function(req, res, next) {
  BlogPost.findOneAndUpdate({
      username: req.params.name,
      title: req.params.title,
      'date.day': req.params.day
    }, {
      body: req.body.text
    },
    function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
      if (err) {
        req.flash('error', err);
        return res.redirect(url); //出错！返回文章页
      }
      req.flash('success', '修改成功!');
      res.redirect(url); //成功！返回文章页
    });
}

exports.removeArticle = function(req, res, next) {
  BlogPost.remove({
      'username': req.params.name,
      'title': req.params.title,
      'date.day': req.params.day
    },
    function(err) {
      if (err) {
        console.log(err);
        throw err;
      }

      req.flash('success', '删除成功!');
      res.redirect('/'); //成功！返回文章页
    });
}

exports.postCommit = function(req, res, next) {

  var md5 = crypto.createHash('md5'),
    email_MD5 = md5.update(req.body.email.toLowerCase()).digest('hex'),
    head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
  var comment = new CommentModel({
    name: req.body.name,
    head: head,
    email: req.body.email,
    website: req.body.website,
    time: dateUtil.getDateTime(),
    content: req.body.content
  });

  BlogPost.findOneAndUpdate({
    'username': req.params.name,
    'title': req.params.title,
    'date.day': req.params.day
  }, {
    $push: {
      "comments": comment
    }
  }, function(err, blogs) {
    //如果err==null，则user就能取到数据
    if (err) {
      console.log(err);
      throw err;
    }
    var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
    if (err) {
      req.flash('error', err);
      return res.redirect(url); //出错！返回文章页
    }
    req.flash('success', '修改成功!');
    res.redirect(url); //成功！返回文章页

  });
}