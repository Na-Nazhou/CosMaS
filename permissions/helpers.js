const db = require('../db');
const course_memberships = require('../sql/course_memberships');
const course_requests = require('../sql/course_requests');
const group_memberships = require('../sql/group_memberships');
const accesses = require('../sql/accesses');

/* Util methods */
// Checks if all checks have passed
const passedAll = (...checks) => {
  return Promise.all(checks).then(results => results.every(result => result));
};

// Checks if any check has passed
const passedAny = (...checks) => {
  return Promise.all(checks).then(results => results.some(result => result));
};

const notPass = check => {
  return check.then(result => !result);
};

/* Checkers */
/* All checkers should return promises that resolve to boolean values */
const isAdmin = async user => user.is_admin;
const isNotAdmin = user => notPass(isAdmin(user));

const isSameUserID = async (userID1, userID2) => userID1 === userID2;

const isInCourse = (user, semester_name, module_code) => {
  return db
    .query(course_memberships.queries.find_membership, [semester_name, module_code, user.id])
    .then(data => data.rowCount > 0);
};
const isNotInCourse = (user, semester_name, module_code) => {
  return notPass(isInCourse(user, semester_name, module_code));
};

// Professors are not in any groups
const isInGroup = (user, semester_name, module_code, group_name) => {
  return db
    .query(group_memberships.queries.find_membership, [semester_name, module_code, group_name, user.id])
    .then(data => data.rows.length === 1);
};

// Professors are not in any forums
const isInForum = (user, semester_name, module_code, forum_title) => {
  // A user can be granted access multiple times (in multiple groups that have access to the same forum)
  return db
    .query(accesses.queries.find_access, [semester_name, module_code, forum_title, user.id])
    .then(data => data.rows.length >= 1);
};

const isProfessorInCourse = (user, semester_name, module_code) => {
  return db
    .query(course_memberships.functions.is_member_in_course, [user.id, semester_name, module_code, 'professor'])
    .then(data => data.rows[0].is_member_in_course);
};

const isTaInCourse = (user, semester_name, module_code) => {
  return db
    .query(course_memberships.functions.is_member_in_course, [user.id, semester_name, module_code, 'TA'])
    .then(data => data.rows[0].is_member_in_course);
};

const hasRequestsToCourse = (user, semester_name, module_code) => {
  return db
    .query(course_requests.queries.find_course_request, [semester_name, module_code, user.id])
    .then(data => data.rowCount > 0);
};

const hasNoRequestsToCourse = (user, semester_name, module_code) => {
  return notPass(hasRequestsToCourse(user, semester_name, module_code));
};

module.exports = {
  passedAll,
  passedAny,
  notPass,
  isAdmin,
  isNotAdmin,
  isSameUserID,
  isInCourse,
  isNotInCourse,
  isInGroup,
  isInForum,
  isProfessorInCourse,
  isTaInCourse,
  hasRequestsToCourse,
  hasNoRequestsToCourse
};
