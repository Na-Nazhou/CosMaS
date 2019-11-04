const courses = require('./courses');
const forums = require('./forums');
const groups = require('./groups');

module.exports = {
  initViewHelpers: app => {
    app.locals = Object.assign(app.locals, courses, groups, forums);
  }
};
