const { isAdmin, isSameUserID } = require('./helpers');

function canIndexUsers(user) {
  return isAdmin(user);
}

// everyone can create user

function canUpdateUser(userID1, userID2) {
  return isSameUserID(userID1, userID2);
}

function canDeleteUser(user) {
  return isAdmin(user);
}

module.exports = {
  canIndexUsers,
  canUpdateUser,
  canDeleteUser
};
