const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { TAsPath } = require('../routes/helpers/TAs');
const { groupPath } = require('../routes/helpers/groups');

// Handles the CRUD of TAs in a group
exports.edit = (req, res, next) => {
  const { semester_name, module_code, name: group_name } = req.params;
  db.query(sql.course_memberships.queries.get_members_by_course,
    [semester_name, module_code, 'TA'], (err1, data1) => {
    if (err1) {
      log.error(`Failed to get TAs of ${module_code} offered in ${semester_name}`);
      req.flash('error', err1.message);
      next(err1);
    } else {
      db.query(sql.group_memberships.queries.get_members_by_group,
        [semester_name, module_code, group_name, 'TA'], (err2, data2) => {
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
      });
    }
  });
};

exports.update = (req, res) => {
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
  db.query(sql.group_memberships.functions.update_TAs, [names, semester_name, module_code, group_name], err => {
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
