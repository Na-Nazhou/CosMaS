const router = require('express').Router({ mergeParams: true });
const forums = require('../controllers/forums_controller');
const accesses = require('../controllers/accesses_controller');
const threads_routes = require('./threads');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const {
  canShowForum,
  canCreateForum,
  canUpdateForum,
  canDeleteForum,
} = require('../permissions/forums');
const { canEditAccess } = require('../permissions/accesses');

router.use((req, res, next) => {
  log.controller('Forums controller handling the request');
  next();
});

router.get(
  '/new',
  ensureAuthorised(req => canCreateForum(req.user, req.params.semester_name, req.params.module_code)),
  forums.new
);
router.get(
  '/:title',
  ensureAuthorised(req => canShowForum(req.user, req.params.semester_name, req.params.module_code, req.params.title)),
  forums.show
);
router.post(
  '/',
  ensureAuthorised(req => canCreateForum(req.user, req.params.semester_name, req.params.module_code)),
  forums.create
);
router.delete(
  '/:title',
  ensureAuthorised(req => canDeleteForum(req.user, req.params.semester_name, req.params.module_code)),
  forums.delete
);
router.get(
  '/:title/edit',
  ensureAuthorised(req => canUpdateForum(req.user, req.params.semester_name, req.params.module_code)),
  forums.edit
);
router.put(
  '/:title',
  ensureAuthorised(req => canUpdateForum(req.user, req.params.semester_name, req.params.module_code)),
  forums.update
);
router.get(
  '/:title/accesses',
  ensureAuthorised(req => canEditAccess(req.user, req.params.semester_name, req.params.module_code)),
  accesses.edit
);
router.post(
  '/:title/accesses',
  ensureAuthorised(req => canEditAccess(req.user, req.params.semester_name, req.params.module_code)),
  accesses.update
);

// Nest thread routes within forums
router.use('/:title/threads', threads_routes);

module.exports = router;
