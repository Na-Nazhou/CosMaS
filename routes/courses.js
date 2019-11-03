const router = require('express').Router();
const courses = require('../controllers/courses_controller');

router.get('/', courses.index);
router.get('/new', courses.new);
router.post('/', courses.create);
router.delete('/:semester_name/:module_code', courses.delete);
router.get('/:semester_name/:module_code/edit', courses.edit);
router.put('/:semester_name/:module_code', courses.update);

module.exports = router;
