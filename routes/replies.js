const router = require('express').Router({ mergeParams: true });
const log = require('../helpers/logging');
const replies = require('../controllers/replies_controller');

router.use((req, res, next) => {
  log.controller('Replies controller handling the request');
  next();
});

router.get('/new', replies.new);
router.post('/', replies.create);

module.exports = router;
