const { userPath } = require('./users');

function courseRequestsPath(requester_id) {
  return `${userPath(requester_id)}/course_requests`;
}

function courseRequestPath(requester_id, semester_name, module_code) {
  return `${courseRequestsPath(requester_id)}/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}`;
}

module.exports = {
  courseRequestsPath,
  courseRequestPath
};
