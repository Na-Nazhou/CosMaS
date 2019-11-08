const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { groupPath } = require('../routes/helpers/groups');
const { groupStudentsPath, TAsPath } = require('../routes/helpers/group_memberships');

exports.delete = (req, res) => {
  const { semester_name, module_code, name: group_name, user_id } = req.params;
  db.query(sql.group_memberships.queries.delete_member, [semester_name, module_code, group_name, user_id], err => {
    if (err) {
      log.error('Failed to delete student');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Successfully deleted student ${user_id} from ${group_name}!`);
    }
    res.redirect(groupPath(semester_name, module_code, group_name));
  });
};

// Handles the CRUD of TAs in a group
exports.editTAs = (req, res, next) => {
  const { semester_name, module_code, name: group_name } = req.params;
  db.query(sql.course_memberships.queries.get_members_by_course, [semester_name, module_code, 'TA'], (err1, data1) => {
    if (err1) {
      log.error(`Failed to get TAs of ${module_code} offered in ${semester_name}`);
      req.flash('error', err1.message);
      next(err1);
    } else {
      db.query(
        sql.group_memberships.queries.get_members_by_group,
        [semester_name, module_code, group_name, 'TA'],
        (err2, data2) => {
          if (err2) {
            log.error(`Failed to get TAs of group ${group_name}`);
            req.flash('error', err2.message);
            next(err2);
          } else {
            res.render('TAForm', {
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
  });
};

exports.updateTAs = (req, res) => {
  const { semester_name, module_code, name: group_name } = req.params;
  const { TA_names } = req.body;
  let names = TA_names;
  if (TA_names === undefined) {
    // empty selection
    names = '{}';
  } else if (Array.isArray(TA_names)) {
    // multiple selections
    names = `{${TA_names.join(', ')}}`;
  } else {
    // single selection
    names = `{${TA_names}}`;
  }
  db.query(sql.group_memberships.functions.updateTAs, [names, semester_name, module_code, group_name], err => {
    if (err) {
      log.error(`Failed to update TAs for group ${group_name} of ${module_code} ${semester_name}`);
      req.flash('error', err.message);
      res.redirect(TAsPath(semester_name, module_code, group_name));
    } else {
      req.flash('success', `Sucessfully updated TA for group ${group_name} of ${module_code} ${semester_name}`);
      res.redirect(groupPath(semester_name, module_code, group_name));
    }
  });
};

// Handles the CRUD of students in a group
exports.editStudents = (req, res, next) => {
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

exports.updateStudents = (req, res) => {
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
  db.query(sql.group_memberships.functions.updateStudents, [names, semester_name, module_code, group_name], err => {
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
