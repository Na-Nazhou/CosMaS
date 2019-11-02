const createError = require('http-errors');
const router = require('express').Router();
const auth = require('./auth_controller');
const users = require('./users_controller');
const semesters = require('./semesters_controller');
const modules = require('./modules_controller');
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
