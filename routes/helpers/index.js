const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const course_requests = require('./course_requests');
const groups = require('./groups');
const group_memberships = require('./group_memberships');
const forums = require('./forums');
const accesses = require('./accesses');
const threads = require('./threads');
const replies = require('./replies');

module.exports = {
  ...semesters,
  ...modules,
  ...courses,
  ...course_requests,
  ...group_memberships,
  ...groups,
  ...forums,
  ...accesses,
  ...threads,
  ...replies
};
