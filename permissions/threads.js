const { passedAny, isAdmin, isProfessorInCourse, isTaInCourse } = require('./helpers');

function canEditThreads(user, semester_name, module_code) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isTaInCourse(user, semester_name, module_code)
  );
}

function canDeleteThreads(user, semester_name, module_code) {
  return canEditThreads(user, semester_name, module_code);
}

module.exports = {
  canEditThreads,
  canDeleteThreads
};
