const course_memberships = {};

course_memberships.queries = {
  // TO BE UPDATED
};

course_memberships.functions = {
  is_member_in_course: 'SELECT is_member_in_course($1,$2,$3,$4)'
};

module.exports = course_memberships;
