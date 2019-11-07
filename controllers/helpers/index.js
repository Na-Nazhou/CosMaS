const db = require('../../db/index');
const sql = require('../../sql');
const log = require('../../helpers/logging');

function findCourse(req, semester_name, module_code) {
  return db
    .query(sql.courses.queries.find_course, [semester_name, module_code])
    .then(data => data.rows[0], err => {
      log.error(`Failed to get course ${semester_name} ${module_code}`);
      req.flash('error', err.message);
      throw err;
    });
}

function findForum(req, semester_name, module_code, forum_title) {
  return db
    .query(sql.forums.queries.find_forum, [semester_name, module_code, forum_title])
    .then(data => data.rows[0], err => {
      log.error(`Failed to get forum ${forum_title} of ${semester_name} ${module_code}`);
      req.flash('error', err.message);
      throw err;
    });
}

function findThread(req, semester_name, module_code, forum_title, created_at) {
  return db
    .query(sql.threads.queries.find_thread, [semester_name, module_code, forum_title, created_at])
    .then(data => data.rows[0], err => {
      log.error(`Failed to get thread created at ${created_at} for ${semester_name} ${module_code}`);
      req.flash('error', err.message);
      throw err;
    });
}

module.exports = {
  findCourse,
  findForum,
  findThread
};
