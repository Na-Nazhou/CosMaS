const sql = require('../sql');
const db = require('../db');
const log = require('../helpers/logging');
const { parseDbFormTimestamp, timestampToDbForm } = require('../helpers/date');
const { threadPath } = require('../routes/helpers/threads');
const { findCourse, findForum, findThread } = require('./helpers');

exports.new = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at: thread_created_at } = req.params;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    const thread = await findThread(req, semester_name, module_code, forum_title, thread_created_at);
    res.render('replyForm', { course, forum, thread, reply: null });
  } catch (err) {
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

exports.edit = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at: thread_created_at, posted_at } = req.params;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    const thread = await findThread(req, semester_name, module_code, forum_title, thread_created_at);
    const reply = await db
      .query(sql.replies.queries.find_reply, [semester_name, module_code, forum_title, thread_created_at, posted_at])
      .then(
        data => data.rows[0],
        err => {
          log.error(`Failed to find reply posted at ${posted_at} in thread ${thread.title}`);
          req.flash('error', err.message);
          throw err;
        }
      );
    res.render('replyForm', { course, forum, thread, reply });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at: thread_created_at, posted_at } = req.params;
  const { content } = req.body;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    const thread = await findThread(req, semester_name, module_code, forum_title, thread_created_at);
    db.query(sql.replies.queries.update_reply, [
      semester_name,
      module_code,
      forum_title,
      thread_created_at,
      posted_at,
      content
    ]).then(
      () => {
        req.flash('success', `Successfully updated reply posted at ${posted_at}!`);
        res.redirect(threadPath(semester_name, module_code, forum_title, parseDbFormTimestamp(thread_created_at)));
      },
      err => {
        req.flash('error', err.message);
        log.error(`Failed to update reply`);
        res.render('replyForm', { course, forum, thread, reply: { content } });
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.delete = (req, res) => {
  const { semester_name, module_code, title: forum_title, created_at: thread_created_at, posted_at } = req.params;
  db.query(sql.replies.queries.delete_reply, [semester_name, module_code, forum_title, thread_created_at, posted_at])
    .then(
      () => {
        req.flash('success', `Successfully deleted reply posted at ${posted_at}!`);
      },
      err => {
        log.error(`Failed to delete reply posted at ${posted_at}`);
        req.flash('error', err.message);
      }
    )
    .then(() => {
      res.redirect(threadPath(semester_name, module_code, forum_title, parseDbFormTimestamp(thread_created_at)));
    });
};
