const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { groupPath } = require('../routes/helpers/groups');
const { groupStudentsPath, groupTAsPath } = require('../routes/helpers/group_memberships');

exports.deleteStudent = (req, res) => {
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
      next(err1);
    } else {
      db.query(
        sql.group_memberships.queries.get_members_by_group,
        [semester_name, module_code, group_name, 'TA'],
        (err2, data2) => {
          if (err2) {
            log.error(`Failed to get TAs of group ${group_name}`);
            next(err2);
          } else {
            res.render('groupTAForm', {
              semester_name,
              module_code,
              group_name,
              selected: data2.rows.map(row => row.user_id),
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
  const { TA_ids } = req.body;
  let ids = TA_ids;
  if (TA_ids === undefined) {
    // empty selection
    ids = '{}';
  } else if (Array.isArray(TA_ids)) {
    // multiple selections
    ids = `{${TA_ids.join(', ')}}`;
  } else {
    // single selection
    ids = `{${TA_ids}}`;
  }
  db.query(sql.group_memberships.functions.updateTAs, [ids, semester_name, module_code, group_name], err => {
    if (err) {
      log.error(`Failed to update TAs for group ${group_name} of ${module_code} ${semester_name}`);
      req.flash('error', err.message);
      res.redirect(groupTAsPath(semester_name, module_code, group_name));
    } else {
      req.flash('success', `Sucessfully updated TA for group ${group_name} of ${module_code} ${semester_name}`);
      res.redirect(groupPath(semester_name, module_code, group_name));
    }
  });
};

// Handles the addition of students to a group
exports.editStudents = (req, res, next) => {
  const { semester_name, module_code, name: group_name } = req.params;
  db.query(
    sql.group_memberships.queries.get_members_not_in_group,
    [semester_name, module_code, group_name, 'student'],
    (err, data) => {
      if (err) {
        log.error(`Failed to get students of ${module_code} offered in ${semester_name}`);
        next(err);
      } else {
        res.render('groupStudentForm', {
          semester_name,
          module_code,
          group_name,
          options: data.rows
        });
      }
    }
  );
};

exports.updateStudents = (req, res) => {
  const { semester_name, module_code, name: group_name } = req.params;
  const { student_ids } = req.body;
  let ids = student_ids;
  if (student_ids === undefined) {
    // empty selection
    ids = '{}';
  } else if (Array.isArray(student_ids)) {
    // multiple selections
    ids = `{${student_ids.join(', ')}}`;
  } else {
    // single selection
    ids = `{${student_ids}}`;
  }
  db.query(sql.group_memberships.functions.updateStudents, [ids, semester_name, module_code, group_name], err => {
    if (err) {
      log.error(`Failed to update TAs for group ${group_name} of ${module_code} ${semester_name}`);
      req.flash('error', err.message);
      res.redirect(groupStudentsPath(semester_name, module_code, group_name));
    } else {
      req.flash('success', `Sucessfully added students for group ${group_name} of ${module_code} ${semester_name}`);
      res.redirect(groupPath(semester_name, module_code, group_name));
    }
  });
};
