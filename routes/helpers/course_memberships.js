function courseMembershipsPath(semester_name, module_code) {
  return `/course_memberships/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}`;
}

function courseMembershipCreatePath(semester_name, module_code) {
  return `${courseMembershipsPath(semester_name, module_code)}`;
}

function courseMembershipNewPath(semester_name, module_code) {
  return `${courseMembershipsPath(semester_name, module_code)}/new`;
}

function courseMembershipDeletePath(semester_name, module_code, user_id) {
  return `${courseMembershipsPath(semester_name, module_code)}/${encodeURIComponent(user_id)}`;
}

module.exports = {
  courseMembershipCreatePath,
  courseMembershipsPath,
  courseMembershipNewPath,
  courseMembershipDeletePath
};
