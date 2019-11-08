const router = require('express').Router({ mergeParams: true });
const course_requests = require('../controllers/course_requests_controller');
const log = require('../helpers/logging');

// users/:id/course_requests

router.use((req, res, next) => {
  log.controller('Course Requests controller handling the request');
  next();
});

router.get('/', course_requests.index);
router.post('/', course_requests.create);
router.delete('/:semester_name/:module_code', course_requests.delete);
router.put('/:semester_name/:module_code', course_requests.update);

module.exports = router;
