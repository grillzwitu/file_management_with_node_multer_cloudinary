const express = require('express');
const router = express.Router();
const fs = require('fs');
const File = require("../models/files");
const { ensureAuthenticated } = require('../config/auth');
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/upload");

/* Upload file router with passport package */
router.post('/uploadfile', upload.single('file'), ensureAuthenticated, async (req, res) => {
    
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
    fs.unlinkSync(req.file.path);
    res.status(201).json(file);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }});

/* download router  */ 
router.get('/getfile/:id', ensureAuthenticated, async (req, res) => {
    
    try {
    // fetch the record from db
    const result = await File.findOne({_id: req.params.id});
    
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }});
  
/* Delete file router */ 
router.delete('/deletefile/:id', ensureAuthenticated, async (req, res) => {
    
    try {
    // fetch the record from db
    const result = await File.findOne({_id: req.params.id});
    //Delete image from cloudinary
    await cloudinary.uploader.destroy(result.storage_id);
    // Delete user from db
    await result.remove();
    res.json(user);
    
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }});

module.exports = router;
