const sql = {};

sql.users = require('./users');
sql.semesters = require('./semesters');
sql.modules = require('./modules');
sql.courses = require('./courses');
sql.groups = require('./groups');
sql.forums = require('./forums');
sql.course_memberships = require('./course_memberships');
sql.group_memberships = require('./group_memberships');

module.exports = sql;
