const router = require('express').Router();
const courses = require('../controllers/courses_controller');
const groups = require('./groups');
const { ensureIsAdmin, authorisedToEditCourse, ensureProfessor } = require('../auth/middleware');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Courses controller handling the request');
  next();
});

router.get('/', courses.index);
router.get('/new', ensureIsAdmin, courses.new);
router.post('/', ensureIsAdmin, courses.create);
router.delete('/:semester_name/:module_code', ensureIsAdmin, courses.delete);
router.get('/:semester_name/:module_code/edit', authorisedToEditCourse, courses.edit);
router.put('/:semester_name/:module_code', authorisedToEditCourse, courses.update);

// Nest group routes within courses
router.use('/groups', ensureAuthenticated, ensureProfessor, groups);

module.exports = router;
