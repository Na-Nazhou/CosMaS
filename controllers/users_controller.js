const bcrypt = require('bcrypt');
const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');

exports.index = (req, res, next) => {
  db.query(sql.users.queries.get_users, (err, data) => {
    if (err) {
      log.error('Failed to get users');
      next(err);
    } else {
      res.render('users', { data: data.rows });
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query(sql.users.queries.delete_user, [id], err => {
    if (err) {
      log.error('Failed to delete user');
      req.flash('error', err.message);
      res.redirect('/users');
    } else if (req.user.id === id) {
      // Log out the user after self-deletion
      req.logout();
      req.flash('success', 'Your account has been successfully deleted. You have been logged out.');
      res.redirect('/');
    } else {
      req.flash('success', `User ${id} successfully deleted!`);
      res.redirect('/users');
    }
  });
};

exports.edit = (req, res, next) => {
  db.query(sql.users.queries.find_user_by_id, [req.params.id], (err, data) => {
    if (err) {
      log.error('Failed to find user');
      next(err);
    } else {
      res.render('userEdit', { targetUser: data.rows[0] });
    }
  });
};

exports.update = (req, res) => {
  const old_id = req.params.id;
  // TODO: update when edit id is supported
  const id = req.body.id || req.params.id;
  const { name } = req.body;
  const raw_password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const password_digest = bcrypt.hashSync(raw_password, salt);

  db.query(sql.users.queries.update_user, [id, name, password_digest, old_id], err => {
    if (err) {
      log.error('Failed up update user');
      req.flash('error', err.message);
      res.render('userEdit', { targetUser: { id: old_id, name } });
    } else {
      req.flash('success', 'Profile successfully updated!');
      res.redirect('back');
    }
  });
};

exports.dashboard = async (req, res, next) => {
  const user_id = req.params.id;
  db.query(sql.course_memberships.queries.get_courses_by_user, [user_id], (err1, data1) => {
    if (err1) {
      log.error('Failed to get user courses');
      next(err1);
    } else {
      db.query(sql.semesters.queries.get_current_semester, (err2, data2) => {
        if (err2) {
          log.error(`Failed to get current semester`);
          next(err2);
        } else {
          const semester = data2.rows[0];
          let courses = data1.rows.reduce(
            (result, row) => {
              if (row.end_time < semester.start_time) {
                result[0].push(row);
              } else if (row.start_time > semester.end_time) {
                result[1].push(row);
              } else {
                result[2].push(row);
              }
              return result;
            },
            [[], [], []]
          );
          courses = courses.map(x =>
            x.reduce(
              (result, row) => {
                let i;
                if (row.role === 'student') {
                  i = 0;
                } else if (row.role === 'professor') {
                  i = 1;
                } else {
                  i = 2;
                }
                result[i].push(row);
                return result;
              },
              [[], [], []]
            )
          );
          res.render('dashboard', { courses });
        }
      });
    }
  });
};
