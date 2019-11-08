const { passedAny, isAdmin, isInCourse, isProfessorInCourse } = require('./helpers');

function canIndexMembers(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isInCourse(user, semester_name, module_code));
}

function canEditNonProfessorOfCourse(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canEditProfessorOfCourse(user) {
  return isAdmin(user);
}

module.exports = {
  canIndexMembers,
  canEditNonProfessorOfCourse,
  canEditProfessorOfCourse
};
