const sql = {};

sql.users = require('./users');
sql.semesters = require('./semesters');
sql.modules = require('./modules');
sql.courses = require('./courses');
sql.groups = require('./groups');
sql.forums = require('./forums');

module.exports = sql;
