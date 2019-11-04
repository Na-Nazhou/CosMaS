const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const groups = require('./groups');
const forums = require('./forums');

module.exports = { ...semesters, ...modules, ...courses, ...groups, ...forums };
