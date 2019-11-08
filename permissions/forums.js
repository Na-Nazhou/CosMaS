const { passedAny, isAdmin, isInForum, isProfessorInCourse, isTaInCourse } = require('./helpers');

function canCreateForum(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canShowForum(user, semester_name, module_code, forum_title) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isTaInCourse(user, semester_name, module_code),
    isInForum(user, semester_name, module_code, forum_title)
  );
}

function canUpdateForum(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canDeleteForum(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

module.exports = {
  canCreateForum,
  canShowForum,
  canUpdateForum,
  canDeleteForum
};
