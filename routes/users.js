const router = require('express').Router();
const users = require('../controllers/users_controller');
const { ensureAuthorised } = require('../permissions');
const { canIndexUsers, canDeleteUser, canUpdateUser } = require('../permissions/users');
const { canIndexUsers, canDeleteUser, canUpdateUser, canViewDashboard } = require('../permissions').checkers;
const course_requests_routes = require('./course_requests');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Users controller handling the request');
  next();
});

router.get('/', ensureAuthorised(req => canIndexUsers(req.user)), users.index);
router.delete('/:id', ensureAuthorised(req => canDeleteUser(req.user)), users.delete);
router.get('/:id/edit', ensureAuthorised(req => canUpdateUser(req.user.id, req.params.id)), users.edit);
router.put('/:id', ensureAuthorised(req => canUpdateUser(req.user.id, req.params.id)), users.update);
router.get('/:id/dashboard', ensureAuthorised(req => canViewDashboard(req.user, req.params.id)), users.dashboard);

// Nest course requests routes within users
router.use('/:id/course_requests', course_requests_routes);

module.exports = router;
