const users = require('./users');
const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const forums = require('./forums');
const log = require('../helpers/logging');

const handleAccessDenied = (req, res) => {
  log.error('Access Denied');
  req.flash('error', 'Access Denied');
  res.status(403);
  res.redirect('back');
};

const ensureAuthorised = funct => (req, res, next) => {
  if (funct(req)) {
    next();
  } else {
    handleAccessDenied(req, res);
  }
};

module.exports = { checkers: { ...users, ...semesters, ...modules, ...courses, ...forums }, ensureAuthorised };
