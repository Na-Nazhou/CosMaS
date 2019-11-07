const { passedAny, isAdmin, isProfessorInCourse, isTaInCourse } = require('./helpers');
const { canShowThread } = require('./threads');

function canCreateReply(user, semester_name, module_code, forum_title) {
  return canShowThread(user, semester_name, module_code, forum_title);
}

function canUpdateReply(user, semester_name, module_code) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isTaInCourse(user, semester_name, module_code)
  );
}

function canDeleteReply(user, semester_name, module_code) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isTaInCourse(user, semester_name, module_code)
  );
}

module.exports = {
  canCreateReply,
  canUpdateReply,
  canDeleteReply
};
