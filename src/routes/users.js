const express = require('express');
const router = express.Router();
const userController = require("../controllers/users_controller")

app.get("/",function(req, res){
    res.render("home"); 
 });
 
 app.get("/register", function(req, res){
     res.render("register");
 });

/* Register router with passport package */
router.post('/register', userController.register);

/* Login router */ 
router.post('/login', userController.login);

/* Logout router  */ 
router.get('/logout', userController.logout);

module.exports = router;
