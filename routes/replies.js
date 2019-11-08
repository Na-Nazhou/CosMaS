const router = require('express').Router({ mergeParams: true });
const log = require('../helpers/logging');
const replies = require('../controllers/replies_controller');
const { ensureAuthorised } = require('../permissions');
const { canCreateReply, canDeleteReply, canUpdateReply } = require('../permissions/replies');

router.use((req, res, next) => {
  log.controller('Replies controller handling the request');
  next();
});

router.get(
  '/new',
  ensureAuthorised(req => canCreateReply(req.user, req.params.semester_name, req.params.module_code, req.params.title)),
  replies.new
);
router.post(
  '/',
  ensureAuthorised(req => canCreateReply(req.user, req.params.semester_name, req.params.module_code, req.params.title)),
  replies.create
);
router.get(
  '/:posted_at/edit',
  ensureAuthorised(req => canUpdateReply(req.user, req.params.semester_name, req.params.module_code)),
  replies.edit
);
router.put(
  '/:posted_at',
  ensureAuthorised(req => canUpdateReply(req.user, req.params.semester_name, req.params.module_code)),
  replies.update
);
router.delete(
  '/:posted_at',
  ensureAuthorised(req => canDeleteReply(req.user, req.params.semester_name, req.params.module_code)),
  replies.delete
);

module.exports = router;
