const express = require('express');
const router = express.Router();
const userController = require("../controllers/users_controller")

router.get("/",function(req, res){
    res.render("pages/home"); 
 });
 
router.get("/register", function(req, res){
     res.render("pages/register");
});

router.get("/login", function(req, res){
    res.render("pages/login");
});

/* Register router with passport package */
router.post('/register', userController.register);

/* Login router */ 
router.post('/login', userController.login);

/* Logout router  */ 
router.get('/logout', userController.logout);

module.exports = router;
