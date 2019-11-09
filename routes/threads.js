const router = require('express').Router({ mergeParams: true });
const log = require('../helpers/logging');
const threads = require('../controllers/threads_controller');
const replies_route = require('./replies');
const { ensureAuthorised } = require('../permissions');
const { canShowThread, canCreateThread, canEditThread, canDeleteThread } = require('../permissions/threads');

// /courses/:semester_name/:module_code/forums/:title/threads

router.use((req, res, next) => {
  log.controller('Threads controller handling the request');
  next();
});

router.get(
  '/new',
  ensureAuthorised(req =>
    canCreateThread(req.user, req.params.semester_name, req.params.module_code, req.params.title)
  ),
  threads.new
);
router.post(
  '/',
  ensureAuthorised(req =>
    canCreateThread(req.user, req.params.semester_name, req.params.module_code, req.params.title)
  ),
  threads.create
);
router.get(
  '/:created_at',
  ensureAuthorised(req => canShowThread(req.user, req.params.semester_name, req.params.module_code, req.params.title)),
  threads.show
);
router.get(
  '/:created_at/edit',
  ensureAuthorised(req => canEditThread(req.user, req.params.semester_name, req.params.module_code)),
  threads.edit
);
router.put(
  '/:created_at',
  ensureAuthorised(req => canEditThread(req.user, req.params.semester_name, req.params.module_code)),
  threads.update
);
router.delete(
  '/:created_at',
  ensureAuthorised(req => canDeleteThread(req.user, req.params.semester_name, req.params.module_code)),
  threads.delete
);

// Nest replies routes within thread
router.use('/:created_at/replies', replies_route);

module.exports = router;
