const db = require('../../db/index');
const sql = require('../../sql');
const log = require('../../helpers/logging');

function findCourse(semester_name, module_code) {
  return db.query(sql.courses.queries.find_course, [semester_name, module_code]).then(
    data => data.rows[0],
    err => {
      log.error(`Failed to get course ${semester_name} ${module_code}`);
      throw err;
    }
  );
}

function findForum(semester_name, module_code, forum_title) {
  return db.query(sql.forums.queries.find_forum, [semester_name, module_code, forum_title]).then(
    data => data.rows[0],
    err => {
      log.error(`Failed to get forum ${forum_title} of ${semester_name} ${module_code}`);
      throw err;
    }
  );
}

function findThread(semester_name, module_code, forum_title, created_at) {
  return db
    .query(sql.threads.queries.find_thread_with_author_name, [semester_name, module_code, forum_title, created_at])
    .then(
      data => data.rows[0],
      err => {
        log.error(`Failed to get thread created at ${created_at} for ${semester_name} ${module_code}`);
        throw err;
      }
    );
}

module.exports = {
  findCourse,
  findForum,
  findThread
};
