const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { courseMembershipsPath, courseMembershipNewPath } = require('../routes/helpers/course_memberships');
const { findCourse } = require('./helpers/index');
const { canDeleteSomeMember } = require('../permissions/course_memberships');

exports.index = async (req, res, next) => {
  const { semester_name, module_code } = req.params;
  try {
    const permissions = {
      can_delete_some_member: await canDeleteSomeMember(req.user, semester_name, module_code)
    };
    const course = await findCourse(semester_name, module_code);
    db.query(sql.course_memberships.queries.get_memberships, [semester_name, module_code], (err, data) => {
      if (err) {
        log.error(`Failed to get course memberships for course ${module_code} offered in ${semester_name}`);
        throw err;
      } else {
        res.render('courseMemberships', { members: data.rows, course, permissions });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.new = (req, res, next) => {
  const { semester_name, module_code } = req.params;
  db.query(sql.course_memberships.queries.get_users_not_in_course, [semester_name, module_code], (err, data) => {
    if (err) {
      log.error(`Failed to get users not in course ${module_code} offered in ${semester_name}`);
      next(err);
    } else {
      res.render('courseMembershipNew', { semester_name, module_code, options: data.rows });
    }
  });
};

exports.create = (req, res) => {
  const { semester_name, module_code } = req.params;
  const { role, user_ids } = req.body;
  let ids = user_ids;
  if (user_ids === undefined) {
    // empty selection
    ids = '{}';
  } else if (Array.isArray(user_ids)) {
    // multiple selections
    ids = `{${user_ids.join(', ')}}`;
  } else {
    // single selection
    ids = `{${user_ids}}`;
  }
  db.query(sql.course_memberships.functions.add_course_members, [ids, role, semester_name, module_code], err => {
    if (err) {
      log.error(`Failed to add members to course ${module_code} ${semester_name}`);
      req.flash('error', err.message);
      res.redirect(courseMembershipNewPath(semester_name, module_code));
    } else {
      req.flash('success', `Sucessfully added members to course ${module_code} ${semester_name}`);
      res.redirect(courseMembershipsPath(semester_name, module_code));
    }
  });
};

exports.delete = (req, res) => {
  const { semester_name, module_code, user_id } = req.params;

  db.query(sql.course_memberships.queries.delete_membership, [semester_name, module_code, user_id], err => {
    if (err) {
      log.error(`Failed to delete ${user_id} from course ${module_code}!`);
      req.flash('error', err.message);
    } else {
      req.flash('success', `Successfully deleted ${user_id} from course ${module_code}!`);
    }
    res.redirect(courseMembershipsPath(semester_name, module_code));
  });
};
