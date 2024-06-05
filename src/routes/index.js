const express = require("express");
var router = express.Router();

/* Initializing other routes */

router.use('/users/', require('./users'));
router.use('/files/', require('./files'));
router.use('/notifications/', require('./notifications'));

router.get("/",function(req, res){
    res.render("pages/home", { currentPage: 'home' }); 
 });

module.exports = router;
