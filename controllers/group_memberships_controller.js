const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');

exports.show = (req, res, next) => {
  const { id, name } = req.params;
  db.query(sql.group_memberships.queries.find_membership, [id, name], (err, data) => {
    if (err) {
      log.error(`Failed to get user ${name} of ${id}`);
      next(err);
    } else {
      res.render('groupmember', { id, name, groupmember: data.rows[0] });
    }
  });
};
