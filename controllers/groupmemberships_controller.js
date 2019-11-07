const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { groupPath } = require('../routes/helpers/groups');

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
