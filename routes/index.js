const createError = require('http-errors');
const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const semesters = require('./semesters');
const modules = require('./modules');
const { ensureAuthenticated } = require('../auth/middleware');

// Root redirect
router.get('/', (req, res) => {
  if (req.user) {
    // TODO: Update to /courses
    res.redirect('/users');
  } else {
    res.render('login');
  }
});

// Routes
router.use('/', auth);
router.use('/users', ensureAuthenticated, users);
router.use('/semesters', ensureAuthenticated, semesters);
router.use('/modules', ensureAuthenticated, modules);

// Return 404 for unknown routes
router.use((req, res, next) => {
  next(createError(404));
});

module.exports = router;