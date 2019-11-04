const courses = require('./courses');

function forumsPath(semester_name, module_code) {
  return `${courses.coursePath(semester_name, module_code)}/forums`;
}

function forumPath(semester_name, module_code, forum_title) {
  return `${forumsPath(semester_name, module_code)}/${encodeURIComponent(forum_title)}`;
}

function forumNewPath(semester_name, module_code) {
  return `${forumsPath(semester_name, module_code)}/new`;
}

function forumEditPath(semester_name, module_code, forum_title) {
  return `${forumPath(semester_name, module_code, forum_title)}/edit`;
}

module.exports = {
  forumsPath,
  forumPath,
  forumNewPath,
  forumEditPath
};
