const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const forums = require('./forums');
const groups = require('./groups');

module.exports = {
  initViewHelpers: app => {
    app.locals = Object.assign(app.locals, semesters, modules, courses, groups, forums);
  }
};
