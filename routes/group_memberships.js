const router = require('express').Router({ mergeParams: true });
const group_memberships = require('../controllers/group_memberships_controller');
const students = require('../controllers/students_controller');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const { canUpdateGroup, canDeleteGroup } = require('../permissions').checkers;

router.use((req, res, next) => {
  log.controller('group memberships controller handling the request');
  next();
});

router.delete(
  '/:user_id',
  ensureAuthorised(req => canDeleteGroup(req.user, req.params.semester_name, req.params.module_code)),
  group_memberships.delete
);

router.get(
  '/',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  students.edit
);
router.post(
  '/',
  ensureAuthorised(req => canUpdateGroup(req.user, req.params.semester_name, req.params.module_code)),
  students.update
);

module.exports = router;
