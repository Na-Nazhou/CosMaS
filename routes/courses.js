const router = require('express').Router();
const courses = require('../controllers/courses_controller');
const groups_routes = require('./groups');
const forums_routes = require('./forums');
const { ensureIsAdmin, ensureIsProfessorInCourse, ensureIsInCourse } = require('../auth/middleware');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Courses controller handling the request');
  next();
});

router.get('/', courses.index);
router.get('/new', ensureIsAdmin, courses.new);
router.post('/', ensureIsAdmin, courses.create);
router.get('/:semester_name/:module_code', ensureIsInCourse, courses.show);
router.delete('/:semester_name/:module_code', ensureIsAdmin, courses.delete);
router.get('/:semester_name/:module_code/edit', ensureIsProfessorInCourse, courses.edit);
router.put('/:semester_name/:module_code', ensureIsProfessorInCourse, courses.update);

// Nest group routes within courses
router.use('/:semester_name/:module_code/groups', authorisedToEditCourse, groups_routes);
// Nest forum routes within courses
router.use('/:semester_name/:module_code/forums', ensureIsInCourse, forums_routes);

module.exports = router;
