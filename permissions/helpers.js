const db = require('../db');
const course_memberships = require('../sql/course_memberships');

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
