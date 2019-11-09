const sql = {};

sql.users = require('./users');
sql.semesters = require('./semesters');
sql.modules = require('./modules');
sql.courses = require('./courses');
sql.groups = require('./groups');
sql.course_requests = require('./course_requests');
sql.forums = require('./forums');
sql.course_memberships = require('./course_memberships');
sql.group_memberships = require('./group_memberships');
sql.accesses = require('./accesses');
sql.threads = require('./threads');
sql.replies = require('./replies');

module.exports = sql;
