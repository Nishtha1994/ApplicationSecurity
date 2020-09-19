// Import the Express module
var express = require('express');
//Create a new Express Instance
var router = express.Router();
//To add an object body
var multer = require('multer');

var mongoose = require('mongoose');
var fs = require('fs');
//Defining schema based on different paramters
var imageSchema = mongoose.Schema({
	path:{
		type: String,
		required: true,
		trim: true
	},
	name:{
		type: String,
		required: true
	},
	createdAt:{
		type: Date,
		default: Date.now
	},
	caption:{
		type: String,
		default: 'No caption'
	}
});

var ImageStore = mongoose.model('Image-store', imageSchema);
/**
 * Description
 * @method connection
 * @param {} req
 * @param {} res
 * @return
 */
//Uploading file to uploads directory
exports.connection = function(req,res){
	res.render('../views/index.ejs');
};
exports.handlingInvalidPages = function(req,res,next){
	var err = new Error();
	err.status = 404;
	next(err);
}
router.getImages = function(callback, limit) {

 Image.find(callback).limit(limit);
}

router.addImage = function(image, callback) {
 Image.create(image, callback);
}

/**
 * Description
 * @method uploadImage
 * @param {} req
 * @param {} res
 * @return
 */
exports.uploadImage = function(req,res){
	console.log('The file name is '+req.file);
	if(!req.file){
		res.render('../views/uploadError.ejs');
	}
	else{
		console.log(req.file.path);
		var imagePath = {}
		//imagepath contains three objects -caption, path and the imageName

 //we are passing two objects in the addImage method.. which is defined above..
		imagePath['path'] = req.file.path;
		imagePath['name'] = req.file.originalname;
		imagePath['caption'] = req.body.caption;
		//error handling
		addImage(imagePath, function(err,data){
			console.log(data);
			if(err||data===null){
				res.render('../views/uploadError.ejs');
			}
			else{
				res.render('../views/uploadSuccess.ejs')
			}
		})
	}
}
/**
 * Description
 * @method getAllImages
 * @param {} req
 * @param {} res
 * @return
 */
exports.getAllImages = function(req,res){
	pagination(req,res);
}


exports.redirect = function(req,res){
	res.render('../views/index.ejs');
}
/**
 * Description
 * @method displayPagination
 * @param {} req
 * @param {} res
 * @return
 */
exports.displayPagination= function(req, res){
	pagination(req,res);
}
//add images which reurns the path
function addImage(imagePath, callback){
	ImageStore.create(imagePath, function(err,data){
		if(err){
			callback(err,null);
		}
		else{
			callback(null,data);
		}
	})
}


//logic to paginate
/**
 * Description
 * @method pagination
 * @param {} req
 * @param {} res
 * @return
 */
function pagination(req,res){
	var query = {};
	var pageSize = 10,
	currentPage = 1,
	images = [],
	imagesArrays = [],
	imagesList = [];

	ImageStore.count({}, function(err,count){
		if(err){
			console.log('err')
		}
		else{
			var totalImages = count;
			var pageCount = Math.ceil(totalImages / pageSize);
			console.log('Total Images are '+totalImages)

			ImageStore.find(query, ["_id","path","caption"]).sort({'createdAt':-1}).exec(function(err,data){
				if(err){
					console.log('Error in retreiving images'+err)
				}
				else{
					data.forEach(function(record){
						var results = {};
						results['caption'] = record.caption;
						var finalPath = record.path.replace('public','');
						results['path'] = finalPath;
						images.push(results);

					})
					//dividing the images length by 10, so that the next ten images are shown in next page and so on.
					while(images.length > 0){
						imagesArrays.push(images.splice(0,pageSize))
					}
					console.log('Images splicer '+imagesArrays);
					if (typeof req.query.page !== 'undefined') {
						currentPage = +req.query.page;
					}
					imagesList = imagesArrays[+currentPage -1];
					res.render('../views/pagination.ejs',{
						images: imagesList,
						pageSize: pageSize,
						totalImages: totalImages,
						pageCount: pageCount,
						currentPage: currentPage
					});
				}
			})
		}
	})
}
