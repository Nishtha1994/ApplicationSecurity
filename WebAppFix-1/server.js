

// Including various dependencies for the executing the code
var express = require('express');
var app = express();
var helmet = require('helmet');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
// Multer is a express library that allows the user to upload files to the Nodejs Server
var multer = require('multer');

// Make sure you run "npm install helmet" to get the Helmet package.
var helmet = require('helmet')

// Sets "X-XSS-Protection: 1; mode=block".
app.use(helmet.xssFilter())

var frameguard = require('frameguard')

// Don't allow me to be in ANY frames:
//app.use(frameguard({ action: 'deny' }))

// Only let me be framed by people of the same origin:
//app.use(frameguard({ action: 'sameorigin' }))
app.use(frameguard())  // defaults to sameorigin

var cors = require('cors');
app.use(cors());
// This uploads and displays images
var routesControls = require('./controller/imagesFile');
// app.use('/', routesControls);
// The storage variable is used to store the filename on the directory names /public/uploads.
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'public/uploads')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});



var upload = multer({
	storage:storage,
	fileFilter: function(req, file, callback){
		var ext = path.extname(file.originalname);
		console.log('File Extension is '+path.extname(file.originalname));

		if(ext !== '.png' && ext !== '.JPG' && ext !== '.gif' && ext !== '.jpeg') {
        	return callback(new Error('Only images are allowed'))
    	}
		callback(null, true)
	}
});

var upload = multer({ storage:storage });
app.use(express.static(__dirname + '/public/'));
mongoose.Promise = global.Promise;

//Connection to the MongoDB database
var promise = mongoose.connect('mongodb://localhost:27017/ImageStore', {
	useMongoClient: true
})

// If success then display the success on the console
promise.then(function(db){
	console.log('dB Connection Successfull');
})
//for error handling
.catch(function(err){
	console.log('Not able to make connection because '+err);
});
app.use(helmet());

app.use(function(err,req,res,next){
	if(err.status !== 404){
		return next();
	}
	res.send(err.message || 'Page Not Found. Please Try a Valid URL');
});
// Different routes to handle the logic.
//calling the function from index.js class using routes object..
app.route('/')
  	.get(routesControls.connection)
  	.post(upload.single('myimage'),routesControls.uploadImage)

app.route('/images')
	.get(routesControls.getAllImages);

app.route('/redirect')
   .get(routesControls.redirect);

app.route('/pagination')
   .get(routesControls.displayPagination);

app.use(function (req, res, next) {
     res.removeHeader("X-Powered-By");
     next();
   });

app.get('/products/:id', function (req, res, next) {
     res.json({msg: 'This is CORS-enabled for all origins!'})
   })

app.listen(80, function () {
     console.log('CORS-enabled web server listening on port 80')
   })
app.listen(port);

console.log('Server Started on '+port);
