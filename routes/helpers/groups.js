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

module.exports = {
  groupsPath,
  groupPath,
  groupNewPath,
  groupEditPath
};
