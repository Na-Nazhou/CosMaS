const router = require('express').Router();
const { ensureUnauthenticated, ensureAuthenticated } = require('../auth/middleware');
const auth = require('../controllers/auth_controller');

// Login
router.get('/login', ensureUnauthenticated, auth.new_session);
router.post('/login', ensureUnauthenticated, auth.create_session);

// Logout
router.get('/logout', ensureAuthenticated, auth.delete_session);

// Signup
router.get('/signup', ensureUnauthenticated, auth.new_user);
router.post('/signup', ensureUnauthenticated, auth.create_user);

module.exports = router;
