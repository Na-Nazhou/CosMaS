const courses = require('./courses');
const forums = require('./forums');

module.exports = {
  initViewHelpers: app => {
    app.locals = Object.assign(app.locals, courses, forums);
  }
};
