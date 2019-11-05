const forums = require('./forums');

function accessesPath(semester_name, module_code, forum_title) {
  return `${forums.forumPath(semester_name, module_code, forum_title)}/accesses`;
}

module.exports = {
  accessesPath
};
