const bcrypt = require('bcrypt');
const db = require('../db');
const sql = require('../sql');

exports.index = (req, res) => {
  db.query(sql.users.queries.get_users, (err, data) => {
    if (err) console.error('Cannot get users');
    res.render('users', { data: data.rows });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query(sql.users.queries.delete_user, [id], err => {
    if (err) {
      console.error('Cannot delete user');
      res.send({ error: err.message });
    } else if (req.user.id === id) {
      // Log out the user during self-deletion
      req.logout();
      res.send({ redirectUrl: '/' });
    } else {
      res.send({ redirectUrl: '/users' });
    }
  });
};

exports.edit = (req, res) => {
  db.query(sql.users.queries.find_user_by_id, [req.params.id], (err, data) => {
    if (err) console.error('Cannot find user');
    res.render('userEdit', { user: data.rows[0] });
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
      console.error('Cannot update user');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/users' });
  });
};
