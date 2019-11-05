const { isAdmin } = require('./helpers');

function canAccessModules(user) {
  return isAdmin(user);
}

module.exports = {
  canAccessModules
};
