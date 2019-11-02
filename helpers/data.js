const toDate = require('date-fns/toDate');
const format = require('date-fns/format');

exports.formatDate = dateString => format(toDate(dateString), 'yyyy-MM-dd');
