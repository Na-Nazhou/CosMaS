const { passedAny, isAdmin, isProfessorInCourse } = require('./helpers');

// Everyone can index courses

function canCreateCourse(user) {
  return isAdmin(user);
}

function canUpdateCourse(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canDeleteCourse(user) {
  return isAdmin(user);
}

module.exports = {
  canCreateCourse,
  canUpdateCourse,
  canDeleteCourse
};
