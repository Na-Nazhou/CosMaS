const { isAdmin, isSameUser } = require('./helpers');

function canIndexUsers(user) {
  return isAdmin(user);
}

// everyone can create user

function canUpdateUser(user1, user2) {
  return isSameUser(user1, user2);
}

function canDeleteUser(user) {
  return isAdmin(user);
}

module.exports = {
  canIndexUsers,
  canUpdateUser,
  canDeleteUser
};
