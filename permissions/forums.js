const { passedAny, isAdmin, isInForum, isProfessorInCourse } = require('./helpers');

function canCreateForum(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

// TODO: to decide whether to allow ta access all forums
// Currently TA can only access forums that can be accessed by their assigned groups
function canShowForum(user, semester_name, module_code, forum_title) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
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
