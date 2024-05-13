const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../auth/auth');
const upload = require("../utils/middleware/upload");
const uploadController = require("../controllers/file/upload_file");
const downloadController = require("../controllers/file/retrieve_file");
const deleteController = require("../controllers/file/delete_file");
const allFilesController = require("../controllers/file/list_all_files");
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

/* Delete file route */ 
router.delete('/deletefile/:id', ensureAuthenticated, deleteController);

module.exports = router;
