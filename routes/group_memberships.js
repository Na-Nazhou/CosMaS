const router = require('express').Router({ mergeParams: true });
const group_memberships = require('../controllers/group_memberships_controller');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const { canUpdateGroup, canDeleteGroup } = require('../permissions/groups');

router.use((req, res, next) => {
  log.controller('Group Memberships controller handling the request');
  next();
});

router.get(
  '/TAs',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  group_memberships.editTAs
);
router.post(
  '/TAs',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  group_memberships.updateTAs
);

router.delete(
  '/students/:user_id',
  ensureAuthorised(req => canDeleteGroup(req.user, req.params.semester_name, req.params.module_code)),
  group_memberships.deleteStudents
);

router.get(
  '/students',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  group_memberships.editStudents
);
router.post(
  '/students',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  group_memberships.updateStudents
);

module.exports = router;
