const course_memberships = {};

course_memberships.queries = {
  find_membership: 'SELECT * FROM course_memberships WHERE semester_name=$1 AND module_code=$2 AND user_id=$3'
};

course_memberships.functions = {
  is_member_in_course: 'SELECT is_member_in_course($1,$2,$3,$4)'
};

module.exports = course_memberships;
