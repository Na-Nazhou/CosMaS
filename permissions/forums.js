const { isAdmin, isInCourse, isProfessorInCourse } = require('./helpers');

function canCreateForum(user, semester_name, module_code) {
  return isAdmin(user) || isProfessorInCourse(user, semester_name, module_code);
}

// TODO: Need update, can only access if has forum access
function canShowForum(user, semester_name, module_code) {
  return isAdmin(user) || isInCourse(user, semester_name, module_code);
}

function canUpdateForum(user, semester_name, module_code) {
  return isAdmin(user) || isProfessorInCourse(user, semester_name, module_code);
}

function canDeleteForum(user, semester_name, module_code) {
  return isAdmin(user) || isProfessorInCourse(user, semester_name, module_code);
}

module.exports = {
  canCreateForum,
  canShowForum,
  canUpdateForum,
  canDeleteForum
};
