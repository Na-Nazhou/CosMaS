function usersPath() {
  return '/users';
}

function userPath(user_id) {
  return `${usersPath()}/${user_id}`;
}

function userDashboardPath(user_id) {
  return `${userPath(user_id)}/dashboard`;
}

module.exports = {
  usersPath,
  userPath,
  userDashboardPath
};
