const { passedAny, isAdmin, isInGroup, isProfessorInCourse } = require('./helpers');

function canCreateGroup(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

// TODO: to decide whether to allow ta access all groups
// Currently TA can only access their assigned groups
function canShowGroup(user, semester_name, module_code, group_name) {
  return passedAny(
    isAdmin(user),
    isProfessorInCourse(user, semester_name, module_code),
    isInGroup(user, semester_name, module_code, group_name)
  );
}

function canUpdateGroup(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canDeleteGroup(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

module.exports = {
  canCreateGroup,
  canShowGroup,
  canUpdateGroup,
  canDeleteGroup
};
