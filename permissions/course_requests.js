const db = require('../db');
const course_requests = require('../sql/course_requests');

function canRequestCourse(user, semester_name, module_code) {
  return db
    .query(course_requests.functions.is_allowed_to_request, [user.id, semester_name, module_code])
    .then(data => data.rows[0].is_allowed_to_request);
}

module.exports = {
  canRequestCourse
};
