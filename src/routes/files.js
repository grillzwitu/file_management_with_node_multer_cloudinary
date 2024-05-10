const express = require('express');
const router = express.Router();
const fs = require('fs');
const deleteFile = require("../utils/delete_local_file")
const File = require("../models/files");
const axios = require('axios');
const path = require('path');
const { promisify } = require('util');
const streamPipeline = promisify(require('stream').pipeline);
const { ensureAuthenticated } = require('../config/auth');
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/upload");

/* Upload file router with passport package */
router.post('/uploadfile', upload.single('file', ), ensureAuthenticated, async (req, res) => {
    
    try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    
     // Create file record 
    let file = new File({
      name: result.original_filename,
      storage_id: result.public_id,
      url: result.secure_url,
      last_update_date: result.created_at
    });
    // Save file
    await file.save();

    //remove file from uploads
    deleteFile(req.file.path);

    res.status(201).json(file);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }});

/* download router  */ 
router.get('/getfile/:id', ensureAuthenticated, async (req, res) => {
    
  try {
    // Fetch the record from the database
    const result = await File.findOne({ _id: req.params.id });

    // check if file exists on db
    if (!result) {
      return res.status(404).json({ error: 'File not found' });
    }

    const url = result.url;

    // setting the download directory
    const downloadDir = './downloads';

    // Extracting filename from URL
    const filename = path.basename(url);

    // Create a writable stream to save the file
    const writer = fs.createWriteStream(path.join(downloadDir, filename));

    // Download the file from the URL and pipe it to the writer stream
    const response = await axios.get(url, { responseType: 'stream' });
    await streamPipeline(response.data, writer);

    console.log('File downloaded successfully.');

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

/* Delete file router */ 
router.delete('/deletefile/:id', ensureAuthenticated, async (req, res) => {
    
    try {
    // fetch the record from db
    const result = await File.findOne({_id: req.params.id});
    
    // check if file exists on db
    if (!result) {
      return res.status(404).json({ error: 'File not found' });
    }
  
    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(result.storage_id);

    // Delete file record from the database
    await File.findByIdAndDelete({_id: req.params.id});

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
