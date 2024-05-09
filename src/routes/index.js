const express = require("express");
var router = express.Router();

/* Initializing other routes */
router.use('/', require('./users.js'));
router.use('/', require('./files.js'));

module.exports = router;
