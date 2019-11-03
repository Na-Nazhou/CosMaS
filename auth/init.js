const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');

function findUser(id, callback) {
  db.query(sql.users.queries.find_user_by_id, [id], (err, data) => {
    if (err) {
      log.error('Failed to get users from the database');
      return callback(null);
    }

    if (data.rows.length === 0) {
      log.error('User does not exist?');
      return callback(null);
    }
    if (data.rows.length === 1) {
      return callback(null, data.rows[0]);
    }
    log.error('More than one user?');
    return callback(null);
  });
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  findUser(id, done);
});

function initPassport() {
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'id',
        passwordField: 'password'
      },
      (req, id, password, done) => {
        findUser(id, (err, user) => {
          if (err) {
            return done(err);
          }

          // User not found
          if (!user) {
            return done(null, false, {
              message: 'User Not Found',
              type: 'error'
            });
          }

          // Always use hashed passwords and fixed time comparison
          return bcrypt.compare(password, user.password_digest, (error, isValid) => {
            if (error) {
              return done(error);
            }
            if (!isValid) {
              return done(null, false, {
                message: 'Incorrect password',
                type: 'error'
              });
            }
            return done(null, user);
          });
        });
      }
    )
  );
}

module.exports = initPassport;
