const { passedAny, isAdmin, isInCourse, isProfessorInCourse } = require('./helpers');

// Everyone can index courses

function canCreateCourse(user) {
  return isAdmin(user);
}

function canShowCourse(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isInCourse(user, semester_name, module_code));
}

function canUpdateCourse(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canDeleteCourse(user) {
  return isAdmin(user);
}

module.exports = {
  canCreateCourse,
  canShowCourse,
  canUpdateCourse,
  canDeleteCourse
};
