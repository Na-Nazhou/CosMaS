const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../db');
const sql = require('../sql');
const { ensureUnauthenticated, ensureAuthenticated } = require('../auth/middleware');

// Login
router.get('/login', ensureUnauthenticated, (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  ensureUnauthenticated,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// Logout
router.get('/logout', ensureAuthenticated, (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

// Signup
router.get('/signup', ensureUnauthenticated, (req, res) => {
  res.render('signup');
});

router.post('/signup', ensureUnauthenticated, (req, res) => {
  const { id } = req.body;
  const { name } = req.body;
  const raw_password = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const password_digest = bcrypt.hashSync(raw_password, salt);

  db.query(sql.users.queries.create_user, [id, name, password_digest], err => {
    if (err) {
      console.error('Cannot create user');
      // TODO: refine error message
      req.flash('error', err.message);
      res.redirect('/signup');
    } else {
      req.login({ id, password: raw_password }, loginError => {
        if (!loginError) {
          res.redirect('/');
        } else {
          console.error(loginError);
        }
      });
    }
  });
});

module.exports = router;
