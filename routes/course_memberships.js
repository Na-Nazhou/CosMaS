const router = require('express').Router();
const course_memberships = require('../controllers/course_memberships_controller');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Course Memberships controller handling the request');
  next();
});

router.post('/', course_memberships.create);
router.get('/:semester_name/:module_code', course_memberships.index);
router.get('/:semester_name/:module_code/new', course_memberships.new);
router.delete('/:semester_name/:module_code/:user_id', course_memberships.delete);

module.exports = router;
