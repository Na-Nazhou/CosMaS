const db = require('../db');
const course_memberships = require('../sql/course_memberships');
const group_memberships = require('../sql/group_memberships');
const accesses = require('../sql/accesses');

exports.isAdmin = user => user.is_admin;

exports.isSameUserID = (userID1, userID2) => userID1 === userID2;

exports.isInCourse = (user, semester_name, module_code) =>
  db.query(course_memberships.queries.find_membership, [semester_name, module_code, user.id], (err, data) => {
    if (err) {
      throw new Error(err.message);
    } else {
      return data.rows.length === 1;
    }
  });

// Professors are not in any groups
exports.isInGroup = (user, semester_name, module_code, group_name) =>
  db.query(
    group_memberships.queries.find_membership,
    [semester_name, module_code, group_name, user.id],
    (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        return data.rows.length === 1;
      }
    }
  );

// Professors are not in any forums
exports.isInForum = (user, semester_name, module_code, forum_title) =>
  db.query(accesses.queries.find_access, [semester_name, module_code, forum_title, user.id], (err, data) => {
    if (err) {
      throw new Error(err.message);
    } else {
      // A user can be granted access multiple times (in multiple groups that have access to the same forum)
      return data.rows.length >= 1;
    }
  });

exports.isProfessorInCourse = (user, semester_name, module_code) =>
  db.query(
    course_memberships.functions.is_member_in_course,
    [user.id, semester_name, module_code, 'professor'],
    (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        return data.rows[0].is_member_in_course;
      }
    }
  );

exports.isTaInCourse = (user, semester_name, module_code) =>
  db.query(
    course_memberships.functions.is_member_in_course,
    [user.id, semester_name, module_code, 'TA'],
    (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        return data.rows[0].is_member_in_course;
      }
    }
  );
