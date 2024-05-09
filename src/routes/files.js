const express = require('express');
const router = require("express").Router();
const fileController = require("../controllers/files_controller");
const { ensureAuthenticated } = require('../config/auth');

/* Upload file router with passport package */
router.post('/uploadfile', ensureAuthenticated, fileController.upload);

/* download router  */ 
router.get('/getfile:name', ensureAuthenticated, fileController.getFile);
  
/* Delete file router */ 
router.delete('/deletefile', ensureAuthenticated, fileController.delete);

module.exports = router;
