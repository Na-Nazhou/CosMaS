const sql = require('../sql');
const db = require('../db');
const log = require('../helpers/logging');
const { timestampToDbForm } = require('../helpers/date');
const { threadPath } = require('../routes/helpers/threads');
const { findCourse, findForum, findThread } = require('./helpers');

exports.new = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at: thread_created_at } = req.params;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    const thread = await findThread(req, semester_name, module_code, forum_title, thread_created_at);
    await db
      .query(sql.users.queries.find_user_by_id, [thread.author_id])
      .then(data => Object.assign(thread, { author_name: data.rows.length >= 1 ? data.rows[0].name : null }))
      .catch(err => {
        log.error(
          `Failed to get author name for thread "${thread.title}" in forum "${forum.title} of ${semester_name} ${module_code}`
        );
        throw err;
      });
    res.render('replyForm', { course, forum, thread, reply: null });
  } catch (err) {
    req.flash('error', err.message);
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at: thread_created_at } = req.params;
  const { content } = req.body;
  const created_at = Date.now();
  const author_id = req.user.id;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    const thread = await findThread(req, semester_name, module_code, forum_title, thread_created_at);
    db.query(sql.replies.queries.create_reply, [
      semester_name,
      module_code,
      forum_title,
      thread_created_at,
      timestampToDbForm(created_at),
      content,
      author_id
    ])
      .then(() => {
        req.flash('success', `Successfully posted reply in thread ${thread.title}!`);
        res.redirect(threadPath(semester_name, module_code, forum_title, thread.created_at));
      })
      .catch(err => {
        log.error(`Failed to post a reply in ${thread.title}`);
        req.flash('error', err.message);
        res.render('replyForm', { course, forum, thread, reply: { content } });
      });
  } catch (err) {
    next(err);
  }
};
