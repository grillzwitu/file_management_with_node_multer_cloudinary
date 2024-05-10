const path = require('path')
const multer = require('multer')

// intialize disk storage
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext);
    }
});

//upload method
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
});

module.exports = upload;
