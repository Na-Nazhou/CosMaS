function authMiddleware() {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  };
}

module.exports = authMiddleware;
