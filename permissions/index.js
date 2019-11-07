const log = require('../helpers/logging');

const handleAccessDenied = (req, res) => {
  log.error('Access Denied');
  req.flash('error', 'Access Denied');
  res.status(403);
  res.redirect('back');
};

const ensureAuthorised = funct => async (req, res, next) => {
  if (await funct(req)) {
    next();
  } else {
    handleAccessDenied(req, res);
  }
};

module.exports = {
  ensureAuthorised
};
