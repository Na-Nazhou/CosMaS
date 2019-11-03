const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../db');
const sql = require('../sql');

exports.new_session = (req, res) => {
  res.render('login');
};

exports.create_session = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.delete_session = (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
};

exports.new_user = (req, res) => {
  res.render('signup');
};

exports.create_user = (req, res, next) => {
  const { id } = req.body;
  const { name } = req.body;
  const raw_password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const password_digest = bcrypt.hashSync(raw_password, salt);

  db.query(sql.users.queries.create_user, [id, name, password_digest], err => {
    if (err) {
      console.error('Failed to create user');
      // TODO: refine error message
      req.flash('error', err.message);
      res.render('signup');
    } else {
      req.login({ id, password: raw_password }, loginError => {
        if (!loginError) {
          res.redirect('/');
        } else {
          console.error('Failed to login after creating account', { loginError });
          next(err);
        }
      });
    }
  });
};
