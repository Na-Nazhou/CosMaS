const route_helpers = require('../routes/helpers');
const permissions_helpers = require('../permissions').checkers;

module.exports = {
  initViewHelpers: app => {
    Object.assign(app.locals, route_helpers, permissions_helpers);
  }
};