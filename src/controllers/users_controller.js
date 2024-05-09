//const express = require('express');
//const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/users');
//const { forwardAuthenticated } = require('../config/auth');

exports.register = (req, res) => {

//    console.log("Request: " + JSON.stringify(req.body))
    // const { name, email, password, password2 } = req.body;
    // let errors = [];
  
    // /* If condition to check whether all credentials are filled */
    // if (!name || !email || !password || !password2) {
    //   errors.push({ msg: 'Please enter all fields' });
    // }
    
    // /* If condition to check whether password 
    // and password2 matches or not */
    // if (password != password2) {
    //   errors.push({ msg: 'Passwords do not match' });
    // }
  
    // /* If condition to check in case password 
    // length is greater than 3 or not */
    // if (password.length < 3) {
    //   errors.push({ msg: 'Password must be at least 3 characters' });
    // }
  
    // if (errors.length > 0) {
    //   res.send('register error')
    // } else {
    
    // /* Checking if user exists */
    //   User.findOne({ email: email }).then(user => {
    //     if (user) {
    //       errors.push({ msg: 'Email already exists' });
    //       res.send('register user exists');
    //     } 
        
    //    /* Creating the user */ 
    //    else {
    //       const newUser = new User({
    //         name,
    //         email,
    //         password
    //       });
          
    //       /* Bcrypt hashing the password for user privacy */
    //       bcrypt.genSalt(10, (err, salt) => {
    //         bcrypt.hash(newUser.password, salt, (err, hash) => {
    //           if (err) throw err;
    //           newUser.password = hash;
    //           newUser
    //             .save()
    //             .then(user => {
    //               res.status(201).send("Register Successful");
    //             })
    //             .catch(err => console.log(err));
    //         });
    //       });
    //     }
    //   });
    // }

    User.register(new User({username: req.body.username}), req.body.name, req.body.password, function(err, user){
      if(err){
          console.log(err);
          return res.render("register");
      }
      passport.authenticate("local")(req, res, function(){
          res.redirect("/secret");
      });
  });
  }

exports.login = (req, res, next) => {

    /* Authenticating if login was successful or 
    not with the help of passport */
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) {
  //         return next(err);
  //     }
  //     if (!user) {
  //         return res.status(400).send('Error in Login');
  //     }
  //     req.logIn(user, (err) => {
  //         if (err) {
  //             return next(err);
  //         }
  //         // Only send response here, no further code execution
  //         return res.status(200).send('Login Successful');
  //     });
  // })(req, res, next);

  passport.authenticate("local",{
    successRedirect: "/upload",
    failureRedirect: "/login"
}), function(req, res, next){};}


exports.logout = (req, res) => {
  req.logout();
  /* Logging out */
  res.send("User Logout");
  res.redirect("/");

}
