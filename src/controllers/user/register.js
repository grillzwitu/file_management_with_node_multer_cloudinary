const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../models/users');

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
                  res.redirect(201, "pages/login");
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }

  }
  