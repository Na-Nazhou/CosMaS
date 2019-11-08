const router = require('express').Router();
const courses = require('../controllers/courses_controller');
const groups_routes = require('./groups');
const forums_routes = require('./forums');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const { canCreateCourse, canShowCourse, canUpdateCourse, canDeleteCourse } = require('../permissions/courses');

router.use((req, res, next) => {
  log.controller('Courses controller handling the request');
  next();
});

router.get('/', courses.index);
router.get('/new', ensureAuthorised(req => canCreateCourse(req.user)), courses.new);
router.post('/', ensureAuthorised(req => canCreateCourse(req.user)), courses.create);
router.get(
  '/:semester_name/:module_code',
  ensureAuthorised(req => canShowCourse(req.user, req.params.semester_name, req.params.module_code)),
  courses.show
);
router.delete('/:semester_name/:module_code', ensureAuthorised(req => canDeleteCourse(req.user)), courses.delete);
router.get(
  '/:semester_name/:module_code/edit',
  ensureAuthorised(req => canUpdateCourse(req.user, req.params.semester_name, req.params.module_code)),
  courses.edit
);
router.put(
  '/:semester_name/:module_code',
  ensureAuthorised(req => canUpdateCourse(req.user, req.params.semester_name, req.params.module_code)),
  courses.update
);

// Nest group routes within courses
router.use('/:semester_name/:module_code/groups', groups_routes);
// Nest forum routes within courses
router.use('/:semester_name/:module_code/forums', forums_routes);

module.exports = router;
