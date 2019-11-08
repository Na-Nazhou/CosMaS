const router = require('express').Router({ mergeParams: true });
const course_memberships = require('../controllers/course_memberships_controller');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const {
  canIndexMembers,
  canAddSomeMember,
  canAddMemberOfRole,
  canDeleteMember
} = require('../permissions/course_memberships');

// courses/:semester_name/:module_code/members

router.use((req, res, next) => {
  log.controller('Course Memberships controller handling the request');
  next();
});

router.get(
  '/',
  ensureAuthorised(req => canIndexMembers(req.user, req.params.semester_name, req.params.module_code)),
  course_memberships.index
);
router.get(
  '/new',
  ensureAuthorised(req => canAddSomeMember(req.user, req.params.semester_name, req.params.module_code)),
  course_memberships.new
);
router.post(
  '/',
  ensureAuthorised(req =>
    canAddMemberOfRole(req.user, req.body.role, req.params.semester_name, req.params.module_code)
  ),
  course_memberships.create
);
router.delete(
  '/:user_id',
  ensureAuthorised(req =>
    canDeleteMember(req.user, req.params.user_id, req.params.semester_name, req.params.module_code)
  ),
  course_memberships.delete
);

module.exports = router;
