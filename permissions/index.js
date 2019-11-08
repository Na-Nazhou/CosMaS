const log = require('../helpers/logging');

const handleAccessDenied = (req, res) => {
  log.error('Access Denied');
  req.flash('error', 'Access Denied');
  res.status(403);
  res.redirect('back');
};

const ensureAuthorised = checkPermissions => async (req, res, next) => {
  try {
    if (await checkPermissions(req)) {
      next();
    } else {
      handleAccessDenied(req, res);
    }
  } catch (err) {
    log.error('An error occurred while checking for permissions.');
    next(err);
  }
};

module.exports = {
  handleAccessDenied,
  ensureAuthorised
};
