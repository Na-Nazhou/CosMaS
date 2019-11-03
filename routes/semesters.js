const router = require('express').Router();
const semesters = require('../controllers/semesters_controller');
const { ensureIsAdmin } = require('../auth/middleware');

router.get('/', semesters.index);
router.get('/new', ensureIsAdmin, semesters.new);
router.post('/', ensureIsAdmin, semesters.create);
router.delete('/:name', ensureIsAdmin, semesters.delete);
router.get('/:name/edit', ensureIsAdmin, semesters.edit);
router.put('/:name', ensureIsAdmin, semesters.update);

module.exports = router;
