const { passedAny, isAdmin, isProfessorInCourse } = require('./helpers');

function canEditAccess(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

module.exports = {
  canEditAccess
};
