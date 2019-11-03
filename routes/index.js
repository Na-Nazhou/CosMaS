const createError = require('http-errors');
const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const { ensureAuthenticated, ensureIsAdmin } = require('../auth/middleware');
const log = require('../helpers/logging');

// Root redirect
router.get('/', (req, res) => {
  if (req.user) {
    log.info('Redirecting from /');
    res.redirect('/courses');
  } else {
    log.info('Unauthenticated user, redirecting to /login');
    res.redirect('/login');
  }
});

// Routes
router.use('/', auth);
router.use('/users', ensureAuthenticated, users);
router.use('/semesters', ensureAuthenticated, ensureIsAdmin, semesters);
router.use('/modules', ensureAuthenticated, ensureIsAdmin, modules);
router.use('/courses', ensureAuthenticated, courses);

// Return 404 for unknown routes
router.use((req, res, next) => {
  log.error(`Unmatched route ${req.path}`);
  next(createError(404));
});

module.exports = router;
