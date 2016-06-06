var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

exports.upload = function (app) {
	// body...

	var storage = multer.diskStorage({
	    destination: function (req, file, cb){
	        cb(null, './public/images')
	    },
	    filename: function (req, file, cb){
	        cb(null, file.originalname)
	    }
	});
	var upload = multer({
	    storage: storage
	});

	app.post('/upload', upload.array('field1', 5), function (req, res) {
	  req.flash('success', '文件上传成功!');
	  res.redirect('/upload');
	});

	app.post('/profile', upload.single('avatar'), function (req, res, next) {
	  // req.file is the `avatar` file
	  // req.body will hold the text fields, if there were any
	  req.flash('success', '文件上传成功!');
	  res.redirect('/resources');	  
	});

	app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
	  // req.files is array of `photos` files
	  // req.body will contain the text fields, if there were any
	});

	var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
	app.post('/cool-profile', cpUpload, function (req, res, next) {
	  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
	  //
	  // e.g.
	  //  req.files['avatar'][0] -> File
	  //  req.files['gallery'] -> Array
	  //
	  // req.body will contain the text fields, if there were any
	});

}