const router = require('express').Router({ mergeParams: true });
const groupmemberships = require('../controllers/groupmemberships_controller');
const log = require('../helpers/logging');
const { ensureAuthorised } = require('../permissions');
const { canShowGroup, canCreateGroup, canUpdateGroup, canDeleteGroup } = require('../permissions').checkers;

router.use((req, res, next) => {
  log.controller('groupmemberships controller handling the request');
  next();
});

router.delete(
  '/:user_id',
  ensureAuthorised(req => canDeleteGroup(req.user, req.params.semester_name, req.params.module_code)),
  groupmemberships.delete
);

module.exports = router;
