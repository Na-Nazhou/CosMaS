const { forumPath } = require('./forums');
const { timestampToDbForm } = require('../../helpers/date');

function threadsPath(semester_name, module_code, forum_title) {
  return `${forumPath(semester_name, module_code, forum_title)}/threads`;
}

function threadPath(semester_name, module_code, forum_title, thread_created_at) {
  return `${threadsPath(semester_name, module_code, forum_title)}/${encodeURIComponent(
    timestampToDbForm(thread_created_at)
  )}`;
}

function threadNewPath(semester_name, module_code, forum_title) {
  return `${threadsPath(semester_name, module_code, forum_title)}/new`;
}

function threadEditPath(semester_name, module_code, forum_title, thread_created_at) {
  return `${threadPath(semester_name, module_code, forum_title, thread_created_at)}/edit`;
}

module.exports = {
  threadsPath,
  threadPath,
  threadNewPath,
  threadEditPath
};
