module.exports = {
    /**
     * Ensuring authentication
     */
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/users/login?currentPage=login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }

      next();  
    }
};
