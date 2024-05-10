const passport = require('passport');

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
