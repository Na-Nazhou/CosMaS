const router = require('express').Router();
const users = require('../controllers/users_controller');
const { ensureAuthorised } = require('../permissions');
const { canIndexUsers, canDeleteUser, canUpdateUser } = require('../permissions/users');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Users controller handling the request');
  next();
});

router.get('/', ensureAuthorised(req => canIndexUsers(req.user)), users.index);
router.delete('/:id', ensureAuthorised(req => canDeleteUser(req.user)), users.delete);
router.get('/:id/edit', ensureAuthorised(req => canUpdateUser(req.user.id, req.params.id)), users.edit);
router.put('/:id', ensureAuthorised(req => canUpdateUser(req.user.id, req.params.id)), users.update);

module.exports = router;
