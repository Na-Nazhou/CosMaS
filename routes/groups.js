const router = require('express').Router();
const groups = require('../controllers/groups_controller');
const { ensureProfessor } = require('../auth/middleware');

router.get('/', groups.index);
router.get('/new', ensureProfessor, groups.new);
router.post('/', ensureProfessor, groups.create);
router.delete('/:name/:semester_name/:module_code', ensureProfessor, groups.delete);
router.get('/:name/:semester_name/:module_code/edit', ensureProfessor, groups.edit);
router.put('/:name/:semester_name/:module_code', ensureProfessor, groups.update);

module.exports = router;
