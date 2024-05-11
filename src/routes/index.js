const express = require("express");
var router = express.Router();

/* Initializing other routes */

router.use('/users/', require('./users'));
router.use('/files/', require('./files'));

module.exports = router;
