const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const User = require('../models/users');


exports.register = (req, res) => {

    const { username, name, password, password2 } = req.body;
    let errors = [];
  
    /* check if all fields exist */
    if (!username || !name || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
    
    /* check if password and password2 match */
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    /* check password length */
    if (password.length < 3) {
      errors.push({ msg: 'Password must be at least 3 characters' });
    }
  
    if (errors.length > 0) {
      res.status(400).send('registeration error')
    } else {
    
    /* Checking if user exists */
      User.findOne({ username: username }).then(user => {
        if (user) {
          errors.push({ msg: 'Username already exists' });
          res.status(400).send('username exists');
        } 
        
       /* Creating the user */ 
       else {
          const newUser = new User({
            username,
            name,
            password
          });
          
          /* hash the password */
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.status(201).send("Register Successful");
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }

  }

exports.login = (req, res, next) => {

    /* Authenticate with passport */
    passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.status(400).send('Error in Login');
      }
      req.logIn(user, (err) => {
          if (err) {
              return next(err);
          }
          
          return res.redirect(200, 'pages/files');
      });
  })(req, res, next);

}

// logout the user
exports.logout = (req, res) => {
  
  req.logout(function(err) {
    if (err) {
      // Handle error, if any
      console.error(err);
      return res.status(500).send('Error logging out');
    }
    /* Logging out */
    res.redirect(200, "pages/home");
  });

}
