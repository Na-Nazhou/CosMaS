const router = require('express').Router();
const modules = require('../controllers/modules_controller');
const { ensureIsAdmin } = require('../auth/middleware');

router.get('/', modules.index);
router.get('/new', ensureIsAdmin, modules.new);
router.post('/', ensureIsAdmin, modules.create);
router.delete('/:module_code', ensureIsAdmin, modules.delete);
router.get('/:module_code/edit', ensureIsAdmin, modules.edit);
router.put('/:module_code', ensureIsAdmin, modules.update);

module.exports = router;
