const bcrypt = require('bcrypt');

// Postgre SQL Connection
const { Pool } = require('pg');
const sql = require('../sql');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.login_get = (req, res) => {
  res.render('login');
};

exports.logout_get = (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
};

exports.index = (req, res) => {
  pool.query(sql.users.queries.get_users, (err, data) => {
    if (err) console.log('Cannot get users');
    res.render('users', { data: data.rows });
  });
};

exports.create_get = (req, res) => {
  res.render('signup');
};

exports.create_post = (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const raw_password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const password_digest = bcrypt.hashSync(raw_password, salt);

  pool.query(sql.users.queries.create_user, [id, name, password_digest], err => {
    if (err) {
      console.log('Cannot create user');
      // TODO: refine error message
      req.flash('error', err.message);
      res.redirect('/signup');
    } else {
      req.login({ id, password: raw_password }, loginError => {
        if (!loginError) {
          res.redirect('/');
        } else {
          console.log(loginError);
        }
      });
    }
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  pool.query(sql.users.queries.delete_user, [id], err => {
    if (err) {
      console.log('Cannot delete user');
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

exports.update_get = (req, res) => {
  pool.query(sql.users.queries.find_user_by_id, [req.params.id], (err, data) => {
    if (err) console.log('Cannot find user');
    res.render('userEdit', { user: data.rows[0] });
  });
};

exports.update_put = (req, res) => {
  const orginalId = req.params.id;
  // TODO: update when edit id is supported
  const id = req.body.id || req.params.id;
  const { name } = req.body;
  const raw_password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const password_digest = bcrypt.hashSync(raw_password, salt);

  pool.query(sql.users.queries.update_user, [id, name, password_digest, orginalId], err => {
    if (err) {
      console.log('Cannot update user');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/users' });
  });
};
