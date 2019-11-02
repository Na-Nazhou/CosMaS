const router = require('express').Router();
const users = require('../controllers/users_controller');
const { ensureIsAdmin } = require('../auth/middleware');

/* PERMISSIONS */
const canEditUser = (req, res, next) => {
    if(req.user.is_admin || req.params.id === req.user.id) {
        next();
    } else {
        res.status(403);
        req.flash('error', 'Unauthorized to edit this user');
        res.redirect('back');
    }
}

router.get('/', users.index);
router.delete('/:id', ensureIsAdmin, users.delete);
router.get('/:id/edit', canEditUser, users.edit);
router.put('/:id', canEditUser, users.update);

module.exports = router;
