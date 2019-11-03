const createError = require('http-errors');
const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const groups = require('./groups');
const { ensureAuthenticated, ensureIsAdmin, ensureProfessor } = require('../auth/middleware');

// Root redirect
router.get('/', (req, res) => {
  if (req.user) {
    console.log('Redirecting from /');
    res.redirect('/courses');
  } else {
    console.log('Unauthenticated user, redirecting to /login');
    res.redirect('/login');
  }
});

// Routes
router.use('/', auth);
router.use('/users', ensureAuthenticated, users);
router.use('/semesters', ensureAuthenticated, ensureIsAdmin, semesters);
router.use('/modules', ensureAuthenticated, ensureIsAdmin, modules);
router.use('/courses', ensureAuthenticated, courses);
router.use('/groups', ensureAuthenticated, ensureProfessor, groups);

// Return 404 for unknown routes
router.use((req, res, next) => {
  console.error(`Unmatched route ${req.path}`);
  next(createError(404));
});

module.exports = router;
