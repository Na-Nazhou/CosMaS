const router = require('express').Router({ mergeParams: true });
const group_memberships = require('../controllers/group_memberships_controller');
const log = require('../helpers/logging');

router.use((req, res, next) => {
  log.controller('Group Memberships controller handling the request');
  next();
});

router.get('/TAs', group_memberships.editTAs);
router.post('/TAs', group_memberships.updateTAs);
router.get('/students', group_memberships.editStudents);
router.post('/students', group_memberships.updateStudents);
router.delete('/students/:user_id', group_memberships.deleteStudent);

module.exports = router;
