const { isAllowedToRequest } = require('./helpers');

function canRequestCourse(user, semester_name, module_code) {
  return isAllowedToRequest(user, semester_name, module_code);
}

module.exports = {
  canRequestCourse
};
