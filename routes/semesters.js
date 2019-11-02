const router = require('express').Router();
const semesters = require('../controllers/semesters_controller');

router.get('/', semesters.index);
router.get('/new', semesters.new);
router.post('/', semesters.create);
router.delete('/:name*', semesters.delete);
router.get('/:name*/edit', semesters.edit);
router.put('/:name*', semesters.update);

module.exports = router;
