const courses = require('./courses');

function groupsPath(semester_name, module_code) {
  return `${courses.coursePath(semester_name, module_code)}/groups`;
}

function groupPath(semester_name, module_code, group_name) {
  return `${groupsPath(semester_name, module_code)}/${encodeURIComponent(group_name)}`;
}

function groupNewPath(semester_name, module_code) {
  return `${groupsPath(semester_name, module_code)}/new`;
}

function groupEditPath(semester_name, module_code, group_name) {
  return `${groupPath(semester_name, module_code, group_name)}/edit`;
}

function groupmembershipPath(semester_name, module_code, group_name, user_id) {
  return `${groupPath(semester_name, module_code, group_name)}/students/${encodeURIComponent(user_id)}`;
}

module.exports = {
  groupsPath,
  groupPath,
  groupNewPath,
  groupEditPath,
  groupmembershipPath
};
