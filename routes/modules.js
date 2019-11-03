const router = require('express').Router();
const modules = require('../controllers/modules_controller');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Modules controller handling the request');
  next();
});

router.get('/', modules.index);
router.get('/new', modules.new);
router.post('/', modules.create);
router.delete('/:module_code', modules.delete);
router.get('/:module_code/edit', modules.edit);
router.put('/:module_code', modules.update);

module.exports = router;
