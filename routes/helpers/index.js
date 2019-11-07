const users = require('./users');
const semesters = require('./semesters');
const modules = require('./modules');
const courses = require('./courses');
const course_requests = require('./course_requests');
const course_memberships = require('./course_memberships');
const groups = require('./groups');
const group_memberships = require('./group_memberships');
const forums = require('./forums');
const accesses = require('./accesses');
const threads = require('./threads');
const replies = require('./replies');

module.exports = {
  ...users,
  ...semesters,
  ...modules,
  ...courses,
  ...course_requests,
  ...course_memberships,
  ...group_memberships,
  ...groups,
  ...forums,
  ...accesses,
  ...threads,
  ...replies
};
