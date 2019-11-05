const router = require('express').Router({mergeParams: true });
const groups = require('../controllers/groups_controller');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('groups controller handling the request');
  next();
});

router.get('/new', groups.new);
router.get('/:name', groups.show);
router.post('/', groups.create);
router.delete('/:name', groups.delete);
router.get('/:name/edit', groups.edit);
router.put('/:name', groups.update);

module.exports = router;
