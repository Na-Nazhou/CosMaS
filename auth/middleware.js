exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.ensureUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.ensureIsAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    res.status(403);
    req.flash('error', 'Access Denied');
    res.redirect('back');
  }
};
