const router = require('express').Router();
const users = require('../controllers/users_controller');
const { ensureIsAdmin, authorisedToEditUser } = require('../auth/middleware');

router.get('/', users.index);
router.delete('/:id', ensureIsAdmin, users.delete);
router.get('/:id/edit', authorisedToEditUser, users.edit);
router.put('/:id', authorisedToEditUser, users.update);

module.exports = router;
