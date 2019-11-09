const {
  passedAll,
  passedAny,
  isAdmin,
  isNotAdmin,
  isSameUserID,
  isNotInCourse,
  hasNoRequestsToCourse,
  isProfessorInCourse
} = require('./helpers');

function canCreateCourseRequest(user, semester_name, module_code, requester_id) {
  return passedAll(
    isNotAdmin(user),
    isSameUserID(user.id, requester_id),
    hasNoRequestsToCourse(user, semester_name, module_code),
    isNotInCourse(user, semester_name, module_code)
  );
}

function canShowCourseRequestsOfCourse(user, semester_name, module_code) {
  return passedAny(isAdmin(user), isProfessorInCourse(user, semester_name, module_code));
}

function canProcessCourseRequest(processer, semester_name, module_code) {
  return passedAny(isAdmin(processer), isProfessorInCourse(processer, semester_name, module_code));
}

function canCancelCourseRequest(user, requester_id) {
  return isSameUserID(user.id, requester_id);
}

module.exports = {
  canCreateCourseRequest,
  canShowCourseRequestsOfCourse,
  canProcessCourseRequest,
  canCancelCourseRequest
};
