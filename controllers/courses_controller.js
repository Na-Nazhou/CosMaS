const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');

exports.index = (req, res, next) => {
  db.query(sql.courses.queries.get_courses, (err, data) => {
    if (err) {
      log.error('Failed to get courses');
      next(err);
    } else {
      res.render('courses', { data: data.rows });
    }
  });
};

exports.new = (req, res, next) => {
  db.query(sql.semesters.queries.get_semesters, (err1, semesters) => {
    if (err1) {
      log.error('Failed to get semesters');
      next(err1);
    } else {
      db.query(sql.modules.queries.get_modules, (err2, modules) => {
        if (err2) {
          log.error('Failed to get modules');
          next(err2);
        } else {
          res.render('courseNew', { semesters: semesters.rows, modules: modules.rows });
        }
      });
    }
  });
};

exports.create = (req, res) => {
  const { semester_name, module_code, title, description, credits } = req.body;

  db.query(sql.courses.queries.create_course, [semester_name, module_code, title, description, credits], err => {
    if (err) {
      log.error('Failed to create course');
      // TODO: refine error message
      req.flash('error', err.message);
      res.redirect('/courses/new');
    } else {
      req.flash('success', `Course ${module_code} ${title} successfully created in ${semester_name}!`);
      res.redirect('/courses');
    }
  });
};

exports.delete = (req, res) => {
  const { semester_name, module_code } = req.params;
  db.query(sql.courses.queries.delete_course, [semester_name, module_code], err => {
    if (err) {
      log.error('Failed to delete course');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Course ${module_code} successfully deleted from ${semester_name}!`);
    }
    res.redirect('/courses');
  });
};

exports.edit = (req, res, next) => {
  const { semester_name, module_code } = req.params;
  db.query(sql.courses.queries.find_course, [semester_name, module_code], (err, data) => {
    if (err) {
      log.error('Failed to find course');
      next(err);
    } else {
      const course = data.rows[0];
      db.query(sql.semesters.queries.get_semesters, (err1, semesters) => {
        if (err1) {
          log.error('Failed to get semesters');
          next(err1);
        } else {
          db.query(sql.modules.queries.get_modules, (err2, modules) => {
            if (err2) {
              log.error('Failed to get modules');
              next(err2);
            } else {
              res.render('courseEdit', {
                course,
                semesters: semesters.rows,
                modules: modules.rows
              });
            }
          });
        }
      });
    }
  });
};

exports.update = (req, res) => {
  const old_semester_name = req.params.semester_name;
  const old_module_code = req.params.module_code;
  const { semester_name, module_code, title, description, credits } = req.body;

  db.query(
    sql.courses.queries.update_course,
    [semester_name, module_code, title, description, credits, old_semester_name, old_module_code],
    err => {
      if (err) {
        log.error('Failed to update course');
        req.flash('error', err.message);
        res.redirect(`/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}/edit`);
      } else {
        req.flash('success', `Course successfully updated!`);
        res.redirect('/courses');
      }
    }
  );
};
