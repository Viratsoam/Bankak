// express
const express = require('express');
// multer used for uploading files and middleware for handling multipart/form-data
const multer = require("multer");
//  module is to convert large images in common formats to smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.
const sharp = require('sharp');
// provides utilities for working with file and directory paths
const path = require("path");
// app
const app = express();
// set the PORT
const port = process.env.PORT || 4000;

// storage engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// multer, set filter and limits 
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.jpg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1920*1080
    }
})
// using the compress files images
app.use('/profile', express.static('compress/images'));

// POST, upload the compress file image and original image
app.post("/upload", upload.single('profile'), async (req, res, next) => {
    let compressFile = path.join(__dirname,'./compress/images',req.file.fieldname +"_"+ Date.now()+".jpg");
    // used to compress the images
    await sharp(req.file.path).resize(320,350).toFile(compressFile);
    res.json({
        success: 1,
        profile_url: `http://localhost:4000/profile/${req.file.filename}`
    });
    next();
})

// error handler for limites and file filter
function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}

// user  Error Handler
app.use(errHandler);

// listen to the PORT | Server Up
app.listen(port, (err) => {
    if(err){
        console.log(`Error:${err}`);
        return;
    }
    console.log(`server up and running on PORT:${port}`);
})