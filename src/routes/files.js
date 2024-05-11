const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const upload = require("../middleware/upload");
const uploadController = require("../controllers/file/upload_file");
const downloadController = require("../controllers/file/retrieve_file");
const deleteController = require("../controllers/file/delete_file");
const allFilesController = require("../controllers/file/list_all_files");

/* Upload file router with passport package */
router.post('/uploadfile', upload.single('file'), ensureAuthenticated,  uploadController);

// List all files router
//router.get('/getAllFiles', ensureAuthenticated, allFilesController);

/* download router  */ 
//router.get('/downloadfile/:id', ensureAuthenticated, downloadController);

/* Delete file router */ 
//router.delete('/deletefile/:id', ensureAuthenticated, deleteController);

module.exports = router;
