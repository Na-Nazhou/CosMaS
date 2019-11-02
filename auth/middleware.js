const handleAccessDenied = (req, res, msg) => {
  req.flash('error', `Access Denied: ${msg}`);
  res.status(403);
  res.redirect('back');
};

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
    handleAccessDenied(req, res, 'Only admin is authorised to access');
  }
};

exports.authorisedToEditUser = (req, res, next) => {
  if (req.user.is_admin || req.params.id === req.user.id) {
    next();
  } else {
    handleAccessDenied(req, res, 'Unauthorised to edit this user');
  }
};
