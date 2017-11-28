module.exports = {

  ensureAuthentification: function(req, res, next) {

    if(req.isAuthenticated()){
      return next()
    } else {
      req.flash('error_msg', 'not authorized to access this page');
      res.redirect('/users/login');
    }
  }
}
