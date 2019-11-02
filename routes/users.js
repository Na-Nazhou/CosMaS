const router = require('express').Router();
const users = require('../controllers/users_controller');

router.get('/', users.index);
router.delete('/:id', users.delete);
router.get('/:id/edit', users.edit);
router.put('/:id', users.update);

module.exports = router;
