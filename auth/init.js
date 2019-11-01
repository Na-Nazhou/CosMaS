const sql_query = require('../sql');

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authMiddleware = require('./middleware');
const antiMiddleware = require('./antimiddle');

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

function findUser(id, callback) {
    pool.query(sql_query.query.find_user_by_id, [id], (err, data) => {
        if (err) {
            console.error("Cannot find users table");
            return callback(null);
        }

        if (data.rows.length == 0) {
            console.error("User does not exist?");
            return callback(null);
        } else if (data.rows.length == 1) {
            return callback(null, {
                id: data.rows[0].id,
                name: data.rows[0].name,
                is_admin: data.rows[0].is_admin,
                password_digest: data.rows[0].password_digest,
            });
        } else {
            console.error("More than one user?");
            return callback(null);
        }
    });
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    findUser(id, done);
})

function initPassport() {
    passport.use(new LocalStrategy(
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
                        message: "User Not Found",
                        type: "error"
                    });
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.password_digest, (err, isValid) => {
                    if (err) {
                        return done(err);
                    }
                    if (!isValid) {
                        return done(null, false, {
                            message: "Incorrect password",
                            type: "error"
                        });
                    }
                    return done(null, user);
                })
            })
        }
    ));

    passport.authMiddleware = authMiddleware;
    passport.antiMiddleware = antiMiddleware;
    passport.findUser = findUser;
}

module.exports = initPassport;
