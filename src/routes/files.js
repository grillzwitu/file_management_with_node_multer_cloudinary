const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../auth/auth');
const upload = require("../utils/middleware/upload");
const uploadController = require("../controllers/file/upload_file");
const downloadController = require("../controllers/file/retrieve_file");
const deleteController = require("../controllers/file/delete_file");
const allFilesController = require("../controllers/file/list_all_files");
const readFilesByName = require("../controllers/file/list_files_by_name");
const readFilesByTag = require("../controllers/file/list_files_by_tag");
const readFilesByExtension = require("../controllers/file/list_files_by_extension");
const shareFile = require('../controllers/file/share_file');
const updatePermission = require('../controllers/file/update_permission');
const File = require("../models/files");

router.get("/", ensureAuthenticated, async function (req, res){
    try {
        // Building the query to include both owned and shared files
        const query = {
            $or: [
                { owner: req.user.username },
                { shared_with: req.user._id }
            ]
        };

        // Finding the files
        const files = await File.find(query).populate('shared_with', 'username');

        // Sending response with files
        //res.status(200).send(files);
        // Render the files page with the files data
        res.render("pages/files", { currentPage: 'files', files: files });
    } catch (err) {
        // If an error occurs during database query
        console.error('Error occurred while reading files:', err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
 });

/* Upload file router with passport package */
router.post('/uploadfile', ensureAuthenticated, upload.single('file'),  uploadController);

// List all files route
router.get('/getallfiles', ensureAuthenticated, allFilesController);

/* download route  */ 
router.get('/downloadfile/:id', ensureAuthenticated, downloadController);

// Get files by name route
router.get('/byname/:name', ensureAuthenticated, (req, res, next) => {
    readFilesByName(req, res, req.params.name, next);
});

// Get files by tag route
router.get('/bytag/:tag', ensureAuthenticated, (req, res, next) => {
    readFilesByTag(req, res, req.params.tag, next);
});

// Get files by extension route
router.get('/byext/:ext', ensureAuthenticated, (req, res, next) => {
    readFilesByExtension(req, res, req.params.ext, next);
});

// Route to share a file with another user
router.post('/sharefile', ensureAuthenticated, shareFile);

// Route to update file permissions for a shared user
router.patch('/updatepermission', ensureAuthenticated, updatePermission);

/* Delete file route */ 
router.delete('/deletefile/:id', ensureAuthenticated, deleteController);

module.exports = router;
