const { passedAny, isAdmin, isProfessorInCourse, isTaInCourse } = require('./helpers');
const { canShowForum } = require('./forums');

function canShowThread(user, semester_name, module_code, forum_title) {
  return canShowForum(user, semester_name, module_code, forum_title);
}

function canCreateThread(user, semester_name, module_code, forum_title) {
  return canShowForum(user, semester_name, module_code, forum_title);
}

function canEditThread(user, semester_name, module_code) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isTaInCourse(user, semester_name, module_code)
  );
}

function canDeleteThread(user, semester_name, module_code) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isTaInCourse(user, semester_name, module_code)
  );
}

module.exports = {
  canShowThread,
  canCreateThread,
  canEditThread,
  canDeleteThread
};
