const passport = require('passport');
const users = require('../controllers/users_controller.js');
const semesters = require('../controllers/semesters_controller.js');
const modules = require('../controllers/modules_controller.js');

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
    app.get('/login', users.login_get);
    
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    /* LOGOUT */
    app.get('/logout', passport.authMiddleware(), users.logout_get);

    /* USERS */
    app.get('/signup', passport.antiMiddleware(), users.create_get);
    app.post('/signup', passport.antiMiddleware(), users.create_post);
    app.get('/users', passport.authMiddleware(), users.index);
    app.get('/users/:id/edit', passport.authMiddleware(), users.update_get);
    app.put('/users/:id', passport.authMiddleware(), users.update_put);
    app.delete('/users/:id', passport.authMiddleware(), users.delete);

    /* SEMESTERS */
    app.get('/semesters/new', passport.authMiddleware(), semesters.create_get);
    app.post('/semesters', passport.authMiddleware(), semesters.create_post);

    /* MODULES */
    app.get('/modules/new', passport.authMiddleware(), modules.create_get);
    app.post('/modules', passport.authMiddleware(), modules.create_post);
}

module.exports = initRouter;
