const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { coursePath } = require('../routes/helpers/courses');
const { forumPath } = require('../routes/helpers/forums');

exports.show = (req, res, next) => {
  const { semester_name, module_code, title } = req.params;
  db.query(sql.forums.queries.find_forum, [semester_name, module_code, title], (err, data) => {
    if (err) {
      log.error(`Failed to get forum ${title} of ${semester_name} ${module_code}`);
      next(err);
    } else {
      res.render('forum', { semester_name, module_code, forum: data.rows[0] });
    }
  });
};

exports.new = (req, res) => {
  const { semester_name, module_code } = req.params;
  res.render('forumForm', { semester_name, module_code, forum: null });
};

exports.create = (req, res) => {
  const { semester_name, module_code, title } = req.body;
  db.query(sql.forums.queries.create_forum, [semester_name, module_code, title], err => {
    if (err) {
      log.error('Failed to create forum');
      req.flash('error', err.message);
      res.redirect(coursePath(semester_name, module_code));
    } else {
      req.flash('success', `Forum ${title} successfully created under ${semester_name} ${module_code}!`);
      res.redirect(forumPath(semester_name, module_code, title));
    }
  });
};

exports.delete = (req, res) => {
  const { semester_name, module_code, title } = req.params;
  db.query(sql.forums.queries.delete_forum, [semester_name, module_code, title], err => {
    if (err) {
      log.error('Failed to delete forum');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Successfully deleted forum ${title} from ${semester_name} ${module_code}!`);
    }
    res.redirect(coursePath(semester_name, module_code));
  });
};

exports.edit = (req, res, next) => {
  const { semester_name, module_code, title } = req.params;
  db.query(sql.forums.queries.find_forum, [semester_name, module_code, title], (err, data) => {
    if (err) {
      log.error(`Failed to get forum ${title} for ${semester_name} ${module_code}`);
      next(err);
    } else {
      res.render('forumForm', { semester_name, module_code, forum: data.rows[0] });
    }
  });
};

exports.update = (req, res) => {
  const { semester_name, module_code, title: old_title } = req.params;
  const { title: new_title } = req.body;

  db.query(sql.forums.queries.update_forum, [semester_name, module_code, old_title, new_title], err => {
    if (err) {
      log.error('Failed to update course');
      req.flash('error', err.message);
      res.render('forumForm', { semester_name, module_code, forum: { title: new_title } });
    } else {
      req.flash('success', `Successfully updated forum`);
      res.redirect(forumPath(semester_name, module_code, new_title));
    }
  });
};
