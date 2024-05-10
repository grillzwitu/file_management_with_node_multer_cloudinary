module.exports = {
    /**
     * Ensuring authentication
     */
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect(401, 'pages/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect(200, '/pages/home');      
    }
};
