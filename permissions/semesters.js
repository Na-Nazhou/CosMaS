const { isAdmin } = require('./helpers');

function canAccessSemesters(user) {
  return isAdmin(user);
}

module.exports = {
  canAccessSemesters
};
