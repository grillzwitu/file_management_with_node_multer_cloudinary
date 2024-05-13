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
      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        try {
          // Render the files page with the files data
          return res.redirect(200, "/files");
        } catch (error) {
          // Handle error if the call to getallfiles endpoint fails
          console.error('Error occurred while fetching files:', error);
          return res.status(500).send('Internal server error');
        }
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
    return res.redirect(200, "/");
  });

}
