const groups = require('./groups');

// students as group members
function groupStudentsPath(semester_name, module_code, group_name) {
  return `${groups.groupPath(semester_name, module_code, group_name)}/students`;
}

function groupStudentPath(semester_name, module_code, group_name, user_id) {
  return `${groupStudentsPath(semester_name, module_code, group_name)}/${encodeURIComponent(user_id)}`;
}

function groupTAsPath(semester_name, module_code, group_name) {
  return `${groups.groupPath(semester_name, module_code, group_name)}/TAs`;
}

module.exports = {
  groupStudentsPath,
  groupStudentPath,
  groupTAsPath
};
