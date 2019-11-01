const passport = require('passport');
const users = require('../controllers/users_controller.js');
const semesters = require('../controllers/semesters_controller.js');
const modules = require('../controllers/modules_controller.js');
const { ensureAuthenticated, ensureUnauthenticated } = require('../auth/middleware');

function initRouter(app) {
  /* INDEX */
  app.get('/', (req, res) => {
    if (req.user) {
      // TODO: Update to /courses
      res.redirect('/users');
    } else {
      res.render('login');
    }
  });

  /* LOGIN */
  app.get('/login', users.login_get);

  app.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  );

  /* LOGOUT */
  app.get('/logout', ensureAuthenticated, users.logout_get);

  /* USERS */
  app.get('/signup', ensureUnauthenticated, users.create_get);
  app.post('/signup', ensureUnauthenticated, users.create_post);
  app.get('/users', ensureAuthenticated, users.index);
  app.get('/users/:id/edit', ensureAuthenticated, users.update_get);
  app.put('/users/:id', ensureAuthenticated, users.update_put);
  app.delete('/users/:id', ensureAuthenticated, users.delete);

  /* SEMESTERS */
  app.get('/semesters/new', ensureAuthenticated, semesters.create_get);
  app.post('/semesters', ensureAuthenticated, semesters.create_post);
  app.get('/semesters', ensureAuthenticated, semesters.index);
  app.get('/semesters/:name*/edit', ensureAuthenticated, semesters.update_get);
  app.put('/semesters/:name*', ensureAuthenticated, semesters.update_put);
  app.delete('/semesters/:name*', ensureAuthenticated, semesters.delete);

  /* MODULES */
  app.get('/modules/new', ensureAuthenticated, modules.create_get);
  app.post('/modules', ensureAuthenticated, modules.create_post);
  app.get('/modules', ensureAuthenticated, modules.index);
  app.get('/modules/:module_code*/edit', ensureAuthenticated, modules.update_get);
  app.put('/modules/:module_code*', ensureAuthenticated, modules.update_put);
  app.delete('/modules/:module_code*', ensureAuthenticated, modules.delete);
}

module.exports = initRouter;
