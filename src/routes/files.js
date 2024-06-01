const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../auth/auth');
const upload = require("../utils/middleware/upload");
const uploadController = require("../controllers/file/upload_file");
const downloadController = require("../controllers/file/retrieve_file");
const deleteController = require("../controllers/file/delete_file");
const allFilesController = require("../controllers/file/list_all_files");
const readFilesByName = require("../controllers/file/read_files_by_name");
const readFilesByTag = require("../controllers/file/read_files_by_tag");
const readFilesByExtension = require("../controllers/file/read_files_by_extension");
const File = require("../models/files");

router.get("/", ensureAuthenticated, async function (req, res){
    try {

        // Call the controller function to get all files
        const files = await File.find({owner: req.user.username});

        // Render the files page with the files data
        res.render("pages/files", { currentPage: 'files', files: files });
    } catch (error) {
        console.error('Error occurred while fetching files:', error);
        res.status(500).send('Internal server error');
    }
 });

/* Upload file router with passport package */
router.post('/uploadfile', ensureAuthenticated, upload.single('file'),  uploadController);

// List all files route
router.get('/getallfiles', ensureAuthenticated, allFilesController);

/* download route  */ 
router.get('/downloadfile/:id', ensureAuthenticated, downloadController);

// Get files by name route
router.get('/files/byname/:name', ensureAuthenticated, (req, res, next) => {
    readFilesByName(req, res, req.params.name, next);
});

// Get files by tag route
router.get('/files/bytag/:tag', ensureAuthenticated, (req, res, next) => {
    readFilesByTag(req, res, req.params.tag, next);
});

// Get files by extension route
router.get('/files/byext/:ext', ensureAuthenticated, (req, res, next) => {
    readFilesByExtension(req, res, req.params.ext, next);
});

// Route to share a file with another user
router.post('/sharefile', ensureAuthenticated, shareFile);

/* Delete file route */ 
router.delete('/deletefile/:id', ensureAuthenticated, deleteController);

module.exports = router;
