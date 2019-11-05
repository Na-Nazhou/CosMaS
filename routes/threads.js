const router = require('express').Router({ mergeParams: true });
const log = require('../helpers/logging');
const threads = require('../controllers/threads_controller');
const replies_route = require('./replies');

router.use((req, res, next) => {
  log.controller('Threads controller handling the request');
  next();
});

router.get('/new', threads.new);
router.post('/', threads.create);
router.get('/:created_at', threads.show);
router.get('/:created_at/edit', threads.edit);
router.put('/:created_at', threads.update);
router.delete('/:created_at', threads.delete);

// Nest replies routes within thread
router.use('/:created_at/replies', replies_route);

module.exports = router;
