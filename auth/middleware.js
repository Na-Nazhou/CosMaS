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
