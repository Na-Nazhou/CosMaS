const router = require('express').Router();
const users = require('../controllers/users_controller');
const { ensureIsSameUser, ensureIsAdmin } = require('../auth/middleware');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Users controller handling the request');
  next();
});

router.get('/', ensureIsAdmin, users.index);
router.delete('/:id', ensureIsAdmin, users.delete);
router.get('/:id/edit', ensureIsSameUser, users.edit);
router.put('/:id', ensureIsSameUser, users.update);

module.exports = router;
