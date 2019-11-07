const sql = require('../sql');
const db = require('../db');
const log = require('../helpers/logging');
const { forumPath } = require('../routes/helpers/forums');
const { timestampToDbForm, parseDbFormTimestamp } = require('../helpers/date');
const { threadPath } = require('../routes/helpers/threads');
const { findCourse, findForum, findThread } = require('./helpers');

exports.new = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title } = req.params;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    res.render('threadForm', { course, forum, thread: null });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title } = req.params;
  const { title, content } = req.body;
  const created_at = Date.now();
  const author_id = req.user.id;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    db.query(sql.threads.queries.create_thread, [
      semester_name,
      module_code,
      forum_title,
      timestampToDbForm(created_at),
      title,
      content,
      author_id
    ])
      .then(() => {
        req.flash('success', `Successfully created thread ${title} in forum ${forum_title}`);
        res.redirect(threadPath(semester_name, module_code, forum_title, created_at));
      })
      .catch(err => {
        log.error(`Failed to create thread ${title} in ${forum_title} of ${semester_name} ${module_code}`);
        req.flash('error', err.message);
        res.render('threadForm', { course, forum, thread: { title, content } });
      });
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res, next) => {
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
    const replies = await db
      .query(sql.replies.queries.get_replies_of_forum, [semester_name, module_code, forum_title, thread_created_at])
      .then(data => data.rows)
      .catch(err => {
        log.error(
          `Failed to get replies of "${thread.title}" thread of "${forum.title}" forum in ${semester_name} ${module_code} ${course.title}`
        );
        throw err;
      });
    const allRepliesProcessed = replies.map(async reply => {
      const author = await db
        .query(sql.users.queries.find_user_by_id, [reply.author_id])
        .then(data => (data.rows.length >= 1 ? data.rows[0] : null))
        .catch(err => {
          log.error(
            `Failed to get author of reply posted at ${reply.created_at} in thread ${thread.title} in forum ${forum.title} of ${semester_name} ${module_code}`
          );
          throw err;
        });
      Object.assign(reply, {
        author_name: author.name
      });
    });
    Promise.all(allRepliesProcessed).then(() => res.render('thread', { course, forum, thread, replies }));
  } catch (err) {
    req.flash('error', err.message);
    next(err);
  }
};

exports.edit = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at } = req.params;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    const thread = await findThread(req, semester_name, module_code, forum_title, created_at);
    res.render('threadForm', { course, forum, thread });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at } = req.params;
  const { title, content } = req.body;
  try {
    const course = await findCourse(req, semester_name, module_code);
    const forum = await findForum(req, semester_name, module_code, forum_title);
    db.query(sql.threads.queries.update_thread, [
      course.semester_name,
      course.module_code,
      forum.title,
      created_at,
      title,
      content
    ])
      .then(() => {
        req.flash(
          'success',
          `Successfully updated "${title}" thread in "${forum.title}" forum of ${course.semester_name} ${course.module_code}`
        );
        res.redirect(
          threadPath(course.semester_name, course.module_code, forum.title, parseDbFormTimestamp(created_at))
        );
      })
      .catch(err => {
        log.error(
          `Failed to update "${title}" thread in "${forum.title}" forum of ${course.semester_name} ${course.module_code}`
        );
        req.flash('error', err.message);
        res.render('threadForm', { course, forum, thread: { title, content } });
      });
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { semester_name, module_code, title: forum_title, created_at } = req.params;
  try {
    const thread = await findThread(req, semester_name, module_code, forum_title, created_at);
    db.query(sql.threads.queries.delete_thread, [semester_name, module_code, forum_title, created_at])
      .then(() => {
        req.flash(
          'success',
          `Successfully deleted ${thread.title} thread in ${forum_title} forum of ${semester_name} ${module_code}`
        );
        res.redirect(forumPath(semester_name, module_code, forum_title));
      })
      .catch(err => {
        log.error(`Failed to delete ${thread.title} thread in ${forum_title} forum of ${semester_name} ${module_code}`);
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
