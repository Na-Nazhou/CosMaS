const course_memberships = {};

course_memberships.queries = {
  find_membership: 'SELECT * FROM course_memberships WHERE semester_name = $1 AND module_code=$2 AND user_id=$3',
  get_memberships:
    'SELECT DISTINCT U.id, U.name, C.role FROM course_memberships C, users U WHERE C.semester_name = $1 AND ' +
    'C.module_code = $2 AND C.user_id = U.id ORDER BY role DESC',
  create_membership: 'INSERT INTO course_memberships VALUES ($1, $2, $3, $4)',
  delete_membership: 'DELETE FROM course_memberships WHERE semester_name = $1 AND module_code = $2 AND user_id = $3'
};

course_memberships.functions = {
  is_member_in_course: 'SELECT is_member_in_course($1,$2,$3,$4)'
};

module.exports = course_memberships;
