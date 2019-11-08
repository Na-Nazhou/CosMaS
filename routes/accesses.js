const router = require('express').Router({ mergeParams: true });
const { ensureAuthorised } = require('../permissions');
const { canEditAccess } = require('../permissions/accesses');
const accesses = require('../controllers/accesses_controller');
const log = require('../helpers/logging');

// courses/:semester_name/:module_code/forums/:title/accesses

router.use((req, res, next) => {
  log.controller('Accesses controller handling the request');
  next();
});

router.get(
  '/',
  ensureAuthorised(req => canEditAccess(req.user, req.params.semester_name, req.params.module_code)),
  accesses.edit
);
router.post(
  '/',
  ensureAuthorised(req => canEditAccess(req.user, req.params.semester_name, req.params.module_code)),
  accesses.update
);

module.exports = router;
