const router = require('express').Router({mergeParams: true });
const forums = require('../controllers/forums_controller');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Forums controller handling the request');
  next();
});

router.get('/new', forums.new);
router.get('/:title', forums.show);
router.post('/', forums.create);
router.delete('/:title', forums.delete);
router.get('/:title/edit', forums.edit);
router.put('/:title', forums.update);

module.exports = router;
