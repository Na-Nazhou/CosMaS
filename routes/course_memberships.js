const router = require('express').Router({ mergeParams: true });
const course_memberships = require('../controllers/course_memberships_controller');
const log = require('../helpers/logging');

// courses/:semester_name/:module_code/members

router.use((req, res, next) => {
  log.controller('Course Memberships controller handling the request');
  next();
});

router.get('/', course_memberships.index);
router.get('/new', course_memberships.new);
router.post('/', course_memberships.create);
router.delete('/:user_id', course_memberships.delete);

module.exports = router;
