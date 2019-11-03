const db = require('../db');
const sql = require('../sql');

exports.index = (req, res) => {
  db.query(sql.groups.queries.get_groups, (err, data) => {
    if (err) console.error('Cannot get groups');
    res.render('groups', { data: data.rows });
  });
};

exports.new = (req, res) => {
  db.query(sql.courses.queries.get_courses, (err, courses) => {
    if (err) console.error('Cannot get courses');
    res.render('groupNew', { courses: courses.rows });
  });
};

exports.create = (req, res) => {
  const { name } = req.body;
  const { semester_name } = req.body;
  const { module_code } = req.body;

  db.query(sql.groups.queries.create_group, [name, semester_name, module_code], err => {
    if (err) {
      console.error('Cannot create group!');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/groups/new');
    }
    req.flash('info', 'Group successfully created!');
    return res.redirect('/groups');
  });
};

exports.delete = (req, res) => {
  const { name } = req.body;
  const { semester_name } = req.params;
  const { module_code } = req.params;
  db.query(sql.groups.queries.delete_group, [name, semester_name, module_code], err => {
    if (err) {
      console.error('Failed to delete group');
      req.flash('error', err.message);
    } else {
      req.flash('success', 'Successfully deleted group');
    }
    res.redirect('/groups');
  });
};

exports.edit = (req, res, next) => {
  const { name } = req.body;
  const { semester_name } = req.params;
  const { module_code } = req.params;
  db.query(sql.groups.queries.find_group, [name, semester_name, module_code], (err, data) => {
    if (err) {
      console.error('Cannot find group');
      next(err);
    } else {
      // TODO: refactor
      const group = {
        name: data.rows[0].name,
        semester_name: data.rows[0].semester_name,
        module_code: data.rows[0].module_code
      };
      db.query(sql.courses.queries.get_courses, (err1, courses) => {
        if (err1) {
          console.error('Failed to get courses');
          next(err1);
        } else {
          res.render('groupEdit', {
            group,
            courses: courses.rows
          });
        }
      });
    }
  });
};

exports.update = (req, res) => {
  const old_semester_name = req.params.semester_name;
  const old_module_code = req.params.module_code;
  const { name } = req.body;
  const { semester_name } = req.body;
  const { module_code } = req.body;

  db.query(
    sql.groups.queries.update_group,
    [name, semester_name, module_code, old_semester_name, old_module_code],
    err => {
      if (err) {
        console.error('Failed to update group');
        req.flash('error', err.message);
        res.redirect(`/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}/edit`);
      } else {
        req.flash('success', `Successfully updated group ${module_code} ${name} offered in ${semester_name}`);
        res.redirect('/groups');
      }
    }
  );
};
