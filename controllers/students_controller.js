const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { groupStudentsPath } = require('../routes/helpers/groups');
const { groupPath } = require('../routes/helpers/groups');

// Handles the CRUD of students in a group
exports.edit = (req, res, next) => {
  const { semester_name, module_code, name: group_name } = req.params;
  db.query(
    sql.group_memberships.queries.get_members_not_in_group,
    [semester_name, module_code, group_name, 'student'],
    (err1, data1) => {
      if (err1) {
        log.error(`Failed to get students of ${module_code} offered in ${semester_name}`);
        req.flash('error', err1.message);
        next(err1);
      } else {
        db.query(
          sql.group_memberships.queries.get_members_by_group,
          [semester_name, module_code, group_name, 'student'],
          (err2, data2) => {
            if (err2) {
              log.error(`Failed to get students of group ${group_name}`);
              req.flash('error', err2.message);
              next(err2);
            } else {
              res.render('studentForm', {
                semester_name,
                module_code,
                group_name,
                selected: data2.rows,
                options: data1.rows
              });
            }
          }
        );
      }
    }
  );
};

exports.update = (req, res) => {
  const { semester_name, module_code, name: group_name } = req.params;
  const { students } = req.body;
  let names = students;
  if (students === undefined) {
    // empty selection
    names = '{}';
  } else if (Array.isArray(students)) {
    // multiple selections
    names = `{${students.join(', ')}}`;
  } else {
    // single selection
    names = `{${students}}`;
  }
  db.query(sql.group_memberships.functions.update_students, [names, semester_name, module_code, group_name], err => {
    if (err) {
      log.error(`Failed to update TAs for group ${group_name} of ${module_code} ${semester_name}`);
      req.flash('error', err.message);
      res.redirect(groupStudentsPath(semester_name, module_code, group_name));
    } else {
      req.flash('success', `Sucessfully updated students for group ${group_name} of ${module_code} ${semester_name}`);
      res.redirect(groupPath(semester_name, module_code, group_name));
    }
  });
};
