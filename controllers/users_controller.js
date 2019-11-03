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
      res.render('userEdit', { user: data.rows[0] });
    }
  });
};

exports.update = (req, res) => {
  const originalId = req.params.id;
  // TODO: update when edit id is supported
  const id = req.body.id || req.params.id;
  const { name } = req.body;
  const raw_password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const password_digest = bcrypt.hashSync(raw_password, salt);

  db.query(sql.users.queries.update_user, [id, name, password_digest, originalId], err => {
    if (err) {
      log.error('Failed up update user');
      req.flash('error', err.message);
      res.render('userEdit', { user: { id: originalId, name } });
    } else {
      req.flash('success', 'Profile successfully updated!');
      res.redirect('back');
    }
  });
};

exports.dashboard = (req, res, next) => {
  const user_id = req.params.id;
  db.query(sql.users.queries.get_user_courses, [user_id], (err, data) => {
    if (err) {
      log.error('Failed to get user courses');
      next(err);
    } else {
      res.render('dashboard', {
        data: data.rows
      });
    }
  });
};
