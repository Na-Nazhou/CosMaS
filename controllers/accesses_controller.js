const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { accessEditPath } = require('../routes/helpers/accesses');
const { forumPath } = require('../routes/helpers/forums');

// Handles the CRUD of group accesss with a forum
exports.edit = (req, res, next) => {
  const { semester_name, module_code, title } = req.params;
  db.query(sql.groups.queries.get_groups_by_course, [semester_name, module_code], (err1, data1) => {
    if (err1) {
      log.error(`Failed to get groups of ${module_code} offered in ${semester_name}`);
      req.flash('error', err1.message);
      next(err1);
    } else {
      db.query(sql.accesses.queries.get_group_names_by_forum, [semester_name, module_code, title], (err2, data2) => {
        if (err2) {
          log.error(`Failed to get groups that access forum ${title} of ${module_code} ${semester_name}`);
          req.flash('error', err2.message);
          next(err2);
        } else {
          res.render('accessForm', { semester_name, module_code, title, selected: data2.rows, options: data1.rows });
        }
      });
    }
  });
};

// exports.update = (req, res) => {
//   const { semester_name, module_code, title } = req.params;
//   const { group_names } = req.body;
//   db.query(sql.accesses.functions.update_accesses, [semester_name, module_code, title, group_names], err => {
//     if (err) {
//       log.error(`Failed to update the group accesses for forum ${title} of ${module_code} ${semester_name}`);
//       req.flash('error', err.message);
//       res.redirect(accessEditPath());
//     } else {
//       req.flash('success', `Sucessfully updated group accesses for forum ${title} of ${module_code} ${semester_name}`);
//       res.redirect(forumPath(semester_name, module_code, title));
//     }
//   });
// };
