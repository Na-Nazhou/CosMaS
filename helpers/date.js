const toDate = require('date-fns/toDate');
const format = require('date-fns/format');
const parse = require('date-fns/parse');

const DB_FORM_TIMESTAMP_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DISPLAY_FORM_TIMESTAMP_FORMAT = 'PPp';
const DISPLAY_FORM_DATE_FORMAT = 'yyyy-MM-dd';

exports.dateToDisplayedForm = date => format(toDate(date), DISPLAY_FORM_DATE_FORMAT);

exports.timestampToDbForm = timestamp => format(toDate(timestamp), DB_FORM_TIMESTAMP_FORMAT);
exports.timestampToDisplayedForm = timestamp => format(toDate(timestamp), DISPLAY_FORM_TIMESTAMP_FORMAT);
exports.parseDbFormTimestamp = timestampString => parse(timestampString, DB_FORM_TIMESTAMP_FORMAT, Date.now());
