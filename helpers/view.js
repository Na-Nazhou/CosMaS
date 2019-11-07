const route_helpers = require('../routes/helpers');
const permissions_helpers = require('../permissions').checkers;
const datetime_helpers = require('./date');

module.exports = {
  initViewHelpers: app => {
    Object.assign(app.locals, route_helpers, permissions_helpers, datetime_helpers);
  }
};
