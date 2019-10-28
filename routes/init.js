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
    /* GET */
    app.get('/', function (req, res, next) {
        res.render('index', { user: req.user });
    });

    /* PROTECTED GET */
    app.get('/login',
        function (req, res) {
            res.render('login');
        });

    app.get('/logout', passport.authMiddleware(), 
        function (req, res) {
            req.session.destroy();
            req.logout();
            res.redirect('/');
        });

    app.get('/users', passport.authMiddleware(), 
        function (req, res, next) {
            pool.query(sql_query.query.users, (err, data) => {
                res.render('users', { data: data.rows });
            });
        });


    app.get('/signup', passport.antiMiddleware(),
        function (req, res, next) {
            res.render('signup');
        });

    /* PROTECTED POST */
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    app.post('/signup', passport.antiMiddleware(), function (req, res, next) {
        // Retrieve Information
        var id = req.body.id;
        var name = req.body.name;
        var raw_password = req.body.password;
        var salt = bcrypt.genSaltSync(10);
        var password_digest = bcrypt.hashSync(raw_password, salt);

        pool.query(sql_query.query.add_user, [id, name, password_digest], (err, data) => {
            res.redirect('/')
        });
    });
}

module.exports = initRouter;
