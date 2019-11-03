const db = require('../db');
const sql = require('../sql');

exports.index = (req, res) => {
  db.query(sql.courses.queries.get_courses, (err, data) => {
    if (err) console.error('Cannot get courses');
    res.render('courses', { data: data.rows });
  });
};

exports.new = (req, res) => {
  db.query(sql.semesters.queries.get_semesters, (err1, semesters) => {
    if (err1) console.error('Cannot get semesters');
    db.query(sql.modules.queries.get_modules, (err2, modules) => {
      if (err2) console.error('Cannot get modules');
      res.render('courseNew', { semesters: semesters.rows, modules: modules.rows });
    });
  });
};

exports.create = (req, res) => {
  const { semester_name } = req.body;
  const { module_code } = req.body;
  const { title } = req.body;
  const { description } = req.body;
  const { credits } = req.body;

  db.query(sql.courses.queries.create_course, [semester_name, module_code, title, description, credits], err => {
    if (err) {
      console.error('Cannot create course!');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/courses/new');
    }
    req.flash('info', 'Course successfully created!');
    return res.redirect('/courses');
  });
};

exports.delete = (req, res) => {
  const { semester_name } = req.params;
  const { module_code } = req.params;
  db.query(sql.courses.queries.delete_course, [semester_name, module_code], err => {
    if (err) {
      console.error('Failed to delete course');
      req.flash('error', err.message);
    } else {
      req.flash('success', 'Successfully deleted course');
    }
    res.redirect('/courses');
  });
};

exports.edit = (req, res, next) => {
  const { semester_name } = req.params;
  const { module_code } = req.params;
  db.query(sql.courses.queries.find_course, [semester_name, module_code], (err, data) => {
    if (err) {
      console.error('Cannot find course');
      next(err);
    } else {
      // TODO: refactor
      const course = {
        semester_name: data.rows[0].semester_name,
        module_code: data.rows[0].module_code,
        title: data.rows[0].title,
        description: data.rows[0].description,
        credits: data.rows[0].credits
      };
      db.query(sql.semesters.queries.get_semesters, (err1, semesters) => {
        if (err1) {
          console.error('Failed to get semesters');
          next(err1);
        } else {
          db.query(sql.modules.queries.get_modules, (err2, modules) => {
            if (err2) {
              console.error('Failed to get modules');
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
  const { semester_name } = req.body;
  const { module_code } = req.body;
  const { title } = req.body;
  const { description } = req.body;
  const { credits } = req.body;

  db.query(
    sql.courses.queries.update_course,
    [semester_name, module_code, title, description, credits, old_semester_name, old_module_code],
    err => {
      if (err) {
        console.error('Failed to update course');
        req.flash('error', err.message);
        res.redirect(`/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}/edit`);
      } else {
        req.flash('success', `Successfully updated course ${module_code} ${title} offered in ${semester_name}`);
        res.redirect('/courses');
      }
    }
  );
};
