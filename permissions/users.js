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

function canViewDashboard(current_user, viewedUserID) {
  return isAdmin(current_user) || isSameUserID(current_user.id, viewedUserID);
}

module.exports = {
  canIndexUsers,
  canUpdateUser,
  canDeleteUser,
  canViewDashboard
};
