const router = require('express').Router({ mergeParams: true });
const group_memberships = require('../controllers/group_memberships_controller');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('group_memberships controller handling the request');
  next();
});

router.get('/:id', group_memberships.show);

module.exports = router;
