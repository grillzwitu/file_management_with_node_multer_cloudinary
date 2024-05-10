const express = require('express');
const router = express.Router();
const registerController = require("../controllers/user/register")
const authenticateController = require("../controllers/user/authenticate")


router.get("/",function(req, res){
    res.render("pages/home"); 
 });

/* Register routing with passport package */
router.get("/register", function(req, res){
    res.render("pages/register");
});

router.post('/register', registerController.register);

/* Login routing */
router.get("/login", function(req, res){
    res.render("pages/login");
});

router.post('/login', authenticateController.login);

/* Logout router  */ 
router.get('/logout', authenticateController.logout);

module.exports = router;
