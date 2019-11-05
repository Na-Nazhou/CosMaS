const { threadPath } = require('./threads');
const { timestampToDbForm } = require('../../helpers/date');

function repliesPath(semester_name, module_code, forum_title, thread_created_at) {
  return `${threadPath(semester_name, module_code, forum_title, thread_created_at)}/replies`;
}

function replyPath(semester_name, module_code, forum_title, thread_created_at, reply_created_at) {
  return `${repliesPath(semester_name, module_code, forum_title, thread_created_at)}/${encodeURIComponent(
    timestampToDbForm(reply_created_at)
  )}`;
}

function replyNewPath(semester_name, module_code, forum_title, thread_created_at) {
  return `${repliesPath(semester_name, module_code, forum_title, thread_created_at)}/new`;
}

function replyEditPath(semester_name, module_code, forum_title, thread_created_at, reply_created_at) {
  return `${replyPath(semester_name, module_code, forum_title, thread_created_at, reply_created_at)}/edit`;
}

module.exports = {
  repliesPath,
  replyPath,
  replyNewPath,
  replyEditPath
};
