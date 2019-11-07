const groups = require('./groups');

function TAsPath(semester_name, module_code, group_name) {
  return `${groups.groupPath(semester_name, module_code, group_name)}/TAs`;
}

module.exports = {
  TAsPath
};
