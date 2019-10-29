const sql_query = require('../sql');
const passport = require('passport');
const bcrypt = require('bcrypt')

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const round = 10;
const salt = bcrypt.genSaltSync(round);

function initRouter(app) {
    /* INDEX */
    app.get('/', function (req, res, next) {
        if (req.user) {
            //TODO: Update to /courses
            res.redirect("/users");
        } else {
            res.render("login")
        }
    });

    /* LOGIN */
    app.get('/login',
        function (req, res) {
            res.render('login');
        });
    
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    /* LOGOUT */
    app.get('/logout', passport.authMiddleware(),
        function (req, res) {
            req.session.destroy();
            req.logout();
            res.redirect('/');
        });

    /* USERS */
    app.get('/signup', passport.antiMiddleware(),
        function (req, res, next) {
            res.render('signup');
        });

    app.post('/signup', passport.antiMiddleware(), function (req, res, next) {
        var id = req.body.id;
        var name = req.body.name;
        var raw_password = req.body.password;
        var salt = bcrypt.genSaltSync(10);
        var password_digest = bcrypt.hashSync(raw_password, salt);

        pool.query(sql_query.query.create_user, [id, name, password_digest], (err, data) => {
            res.redirect('/')
        });
    });

    app.get('/users', passport.authMiddleware(), 
        function (req, res, next) {
            pool.query(sql_query.query.get_users, (err, data) => {
                res.render('users', { data: data.rows });
            });
        });
}

module.exports = initRouter;
