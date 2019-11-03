const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const { ensureAuthenticated } = require('../auth/middleware');
const course_requests = require('./course_requests');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const { canAccessSemesters } = require('../permissions/semesters');
const { canAccessModules } = require('../permissions/modules');

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
router.use('/semesters', ensureAuthenticated, ensureAuthorised(req => canAccessSemesters(req.user)), semesters);
router.use('/modules', ensureAuthenticated, ensureAuthorised(req => canAccessModules(req.user)), modules);
router.use('/courses', ensureAuthenticated, courses);
router.use('/course_requests', ensureAuthenticated, course_requests);

// Render 404 page for unmatched routes
router.use((req, res) => {
  log.error(`Unmatched route ${req.path}`);
  res.render('404');
});

module.exports = router;
