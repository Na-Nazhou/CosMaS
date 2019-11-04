const router = require('express').Router({ mergeParams: true });
const forums = require('../controllers/forums_controller');
const log = require('../helpers/logging');
const { ensureIsProfessorInCourse } = require('../auth/middleware');

router.use((req, res, next) => {
  log.controller('Forums controller handling the request');
  next();
});

router.get('/new', ensureIsProfessorInCourse, forums.new);
router.get('/:title', forums.show);
router.post('/', ensureIsProfessorInCourse, forums.create);
router.delete('/:title', ensureIsProfessorInCourse, forums.delete);
router.get('/:title/edit', ensureIsProfessorInCourse, forums.edit);
router.put('/:title', ensureIsProfessorInCourse, forums.update);

module.exports = router;
