const router = require('express').Router({ mergeParams: true });
const course_requests = require('../controllers/course_requests_controller');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const {
  canCreateCourseRequest,
  canProcessCourseRequest,
  canCancelCourseRequest
} = require('../permissions/course_requests');

// /course_requests/[:user_id]|[:semester_name&:module_code]

router.use((req, res, next) => {
  log.controller('Course Requests controller handling the request');
  next();
});

router.get('/', course_requests.index);
router.post(
  '/:semester_name/:module_code/:requester_id',
  ensureAuthorised(req =>
    canCreateCourseRequest(req.user, req.params.semester_name, req.params.module_code, req.params.requester_id)
  ),
  course_requests.create
);
router.put(
  '/:semester_name/:module_code/:requester_id',
  ensureAuthorised(req => canProcessCourseRequest(req.user, req.params.semester_name, req.params.module_code)),
  course_requests.update
);
router.delete(
  '/:semester_name/:module_code/:requester_id',
  ensureAuthorised(req => canCancelCourseRequest(req.user, req.params.requester_id)),
  course_requests.delete
);

module.exports = router;
