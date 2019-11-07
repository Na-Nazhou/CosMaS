const { passedAny, isAdmin, isInCourse, isProfessorInCourse } = require('./helpers');

function canAddMember(user) {
  return isAdmin(user);
}

function canAddTa(user, semester_name, module_code) {
  return isProfessorInCourse(user, semester_name, module_code);
}

function canViewMembers(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isInCourse(user, semester_name, module_code));
}

module.exports = {
  canAddMember,
  canAddTa,
  canViewMembers
};
