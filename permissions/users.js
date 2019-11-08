const { passedAny, isAdmin, isSameUserID } = require('./helpers');

function canIndexUsers(user) {
  return isAdmin(user);
}

// everyone can create user

function canUpdateUser(user, userID2) {
  return passedAny(isAdmin(user), isSameUserID(user.id, userID2));
}

function canDeleteUser(user) {
  return isAdmin(user);
}

module.exports = {
  canIndexUsers,
  canUpdateUser,
  canDeleteUser
};
