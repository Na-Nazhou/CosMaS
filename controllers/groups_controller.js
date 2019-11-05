const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { coursePath } = require('../routes/helpers/courses');
const { groupPath } = require('../routes/helpers/groups');

exports.show = (req, res, next) => {
  const { semester_name, module_code, name } = req.params;
  db.query(sql.groups.queries.find_group, [semester_name, module_code, name], (err, data) => {
    if (err) {
      log.error(`Failed to get group ${name} of ${semester_name} ${module_code}`);
      next(err);
    } else {
      res.render('group', { semester_name, module_code, group: data.rows[0] });
    }
  });
};

exports.new = (req, res) => {
  const { semester_name, module_code } = req.params;
  res.render('groupForm', { semester_name, module_code, group: null });
};

exports.create = (req, res) => {
  const { semester_name, module_code, name } = req.body;
  db.query(sql.groups.queries.create_group, [semester_name, module_code, name], err => {
    if (err) {
      log.error('Failed to create groups');
      req.flash('error', err.message);
      res.redirect(coursePath(semester_name, module_code));
    }
    req.flash('success', `Group ${name} successfully created under ${semester_name} ${module_code}!`);
    res.redirect(groupPath(semester_name, module_code, name));
  });
};

exports.delete = (req, res) => {
  const { semester_name, module_code, name } = req.params;
  db.query(sql.groups.queries.delete_group, [semester_name, module_code, name], err => {
    if (err) {
      log.error('Failed to delete group');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Successfully deleted group ${name} from ${semester_name} ${module_code}!`);
    }
    res.redirect(coursePath(semester_name, module_code));
  });
};

exports.edit = (req, res, next) => {
  const { semester_name, module_code, name } = req.params;
  db.query(sql.groups.queries.find_group, [semester_name, module_code, name], (err, data) => {
    if (err) {
      log.error(`Failed to get group ${name} for ${semester_name} ${module_code}`);
      next(err);
    } else {
      res.render('groupForm', { semester_name, module_code, group: data.rows[0] });
    }
  });
};

exports.update = (req, res) => {
  const { semester_name, module_code, name: old_name } = req.params;
  const { name: new_name } = req.body;

  db.query(sql.groups.queries.update_group, [semester_name, module_code, old_name, new_name], err => {
    if (err) {
      log.error('Failed to update course');
      req.flash('error', err.message);
      res.render('groupForm', { semester_name, module_code, group: { name: new_name } });
    } else {
      req.flash('success', `Successfully updated group`);
      res.redirect(groupPath(semester_name, module_code, new_name));
    }
  });
};
