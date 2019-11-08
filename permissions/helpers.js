const db = require('../db');
const course_memberships = require('../sql/course_memberships');
const group_memberships = require('../sql/group_memberships');
const accesses = require('../sql/accesses');

/* Util methods */
// Checks if all checks have passed
exports.passedAll = (...checks) => {
  return Promise.all(checks).then(results => results.every(result => result));
};

// Checks if any check has passed
exports.passedAny = (...checks) => {
  return Promise.all(checks).then(results => results.some(result => result));
};

/* Checkers */
/* All checkers should return promises that resolve to boolean values */
exports.isAdmin = async user => user.is_admin;

exports.isSameUserID = async (userID1, userID2) => userID1 === userID2;

exports.isInCourse = (user, semester_name, module_code) => {
  return db
    .query(course_memberships.queries.find_membership, [semester_name, module_code, user.id])
    .then(data => data.rows.length === 1);
};

// Professors are not in any groups
exports.isInGroup = (user, semester_name, module_code, group_name) => {
  return db
    .query(group_memberships.queries.find_membership, [semester_name, module_code, group_name, user.id])
    .then(data => data.rows.length === 1);
};

// Professors are not in any forums
exports.isInForum = (user, semester_name, module_code, forum_title) => {
  // A user can be granted access multiple times (in multiple groups that have access to the same forum)
  return db
    .query(accesses.queries.find_access, [semester_name, module_code, forum_title, user.id])
    .then(data => data.rows.length >= 1);
};

exports.isProfessorInCourse = (user, semester_name, module_code) => {
  return db
    .query(course_memberships.functions.is_member_in_course, [user.id, semester_name, module_code, 'professor'])
    .then(data => data.rows[0].is_member_in_course);
};

exports.isTaInCourse = (user, semester_name, module_code) => {
  return db
    .query(course_memberships.functions.is_member_in_course, [user.id, semester_name, module_code, 'TA'])
    .then(data => data.rows[0].is_member_in_course);
};
