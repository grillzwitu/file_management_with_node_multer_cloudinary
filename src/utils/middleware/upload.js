const fs = require('fs');
const path = require('path')
const multer = require('multer')

// check if local storage location exists.
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// intialize local disk storage
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadDir)
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, file.originalname);
    }
});

//Defining multer
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
});

module.exports = upload;
