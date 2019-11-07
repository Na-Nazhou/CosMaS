const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { coursePath } = require('../routes/helpers/courses');
const { courseMembershipsPath } = require('../routes/helpers/course_memberships');
const { canDeleteUser } = require('../permissions/users');
const { canViewDashboard } = require('../permissions/users');

exports.index = async (req, res, next) => {
  const { semester_name, module_code } = req.params;
  const permissions = {
    can_delete_user: await canDeleteUser(req.user),
    can_view_dashboard: await canViewDashboard(req.user)
  };
  db.query(sql.course_memberships.queries.get_memberships, [semester_name, module_code], (err, data) => {
    if (err) {
      log.error(`Failed to get course memberships for module ${module_code}`);
      next(err);
    } else {
      res.render('courseMemberships', { data: data.rows, semester_name, module_code, permissions });
    }
  });
};

exports.new = (req, res) => {
  const { semester_name, module_code } = req.params;
  res.render('courseMembershipNew', { semester_name, module_code });
};

exports.create = (req, res) => {
  const { role, semester_name, module_code, user_id } = req.body;

  db.query(sql.course_memberships.queries.create_membership, [role, semester_name, module_code, user_id], err => {
    if (err) {
      log.error(`Failed to add ${user_id} to course ${module_code}!`);
      // TODO: refine error message
      req.flash('error', err.message);
    } else {
      req.flash('success', `Successfully added ${user_id} to course ${module_code}!`);
    }
    return res.redirect(coursePath(semester_name, module_code));
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
    return res.redirect(courseMembershipsPath(semester_name, module_code));
  });
};
