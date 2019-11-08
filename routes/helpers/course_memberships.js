const courses = require('./courses');

function courseMembershipsPath(semester_name, module_code) {
  return `${courses.coursePath(semester_name, module_code)}/members`;
}

function courseMembershipNewPath(semester_name, module_code) {
  return `${courseMembershipsPath(semester_name, module_code)}/new`;
}

function courseMembershipDeletePath(semester_name, module_code, user_id) {
  return `${courseMembershipsPath(semester_name, module_code)}/${user_id}`;
}

module.exports = {
  courseMembershipsPath,
  courseMembershipNewPath,
  courseMembershipDeletePath
};
