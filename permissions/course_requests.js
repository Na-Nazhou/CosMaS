const { passedAll, isNotAdmin, hasNoRequestsToCourse } = require('./helpers');

function canRequestCourse(user, semester_name, module_code) {
  return passedAll(isNotAdmin(user), hasNoRequestsToCourse(user, semester_name, module_code));
}

module.exports = {
  canRequestCourse,
};
