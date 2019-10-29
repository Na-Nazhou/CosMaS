const passport = require('passport');

var users = require('../controllers/users_controller.js');

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
        failureRedirect: '/login',
        failureFlash: true
    }));

    /* LOGOUT */
    app.get('/logout', passport.authMiddleware(),
        function (req, res) {
            req.session.destroy();
            req.logout();
            res.redirect('/');
        });

    /* USERS */
    app.get('/signup', passport.antiMiddleware(), users.create_get);
    app.post('/signup', passport.antiMiddleware(), users.create_post);
    app.get('/users', passport.authMiddleware(), users.index);
    app.get('/users/:id/edit', passport.authMiddleware(), users.update_get);
    app.put('/users/:id', passport.authMiddleware(), users.update_put);
    app.delete('/users/:id', passport.authMiddleware(), users.delete)
}

module.exports = initRouter;
