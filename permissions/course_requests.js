const { isInCourse } = require('./helpers');

function canRequestCourse(user, semester_name, module_code) {
  return isInCourse(user, semester_name, module_code);
}

module.exports = {
  canRequestCourse
};
