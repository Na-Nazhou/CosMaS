const router = require('express').Router();
const courses = require('../controllers/courses_controller');
const { ensureIsAdmin, authorisedToEditCourse } = require('../auth/middleware');

router.get('/', courses.index);
router.get('/new', ensureIsAdmin, courses.new);
router.post('/', ensureIsAdmin, courses.create);
router.delete('/:semester_name/:module_code', ensureIsAdmin, courses.delete);
router.get('/:semester_name/:module_code/edit', authorisedToEditCourse, courses.edit);
router.put('/:semester_name/:module_code', authorisedToEditCourse, courses.update);

module.exports = router;
