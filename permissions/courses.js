const { passedAny, isAdmin, isProfessorInCourse, isInCourse } = require('./helpers');

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

// Details include groups and forums
function canShowCourseDetails(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isInCourse(user, semester_name, module_code));
}

module.exports = {
  canCreateCourse,
  canUpdateCourse,
  canDeleteCourse,
  canShowCourseDetails
};
