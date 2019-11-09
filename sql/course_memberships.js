const course_memberships = {};

course_memberships.queries = {
  find_membership: 'SELECT * FROM course_memberships WHERE semester_name = $1 AND module_code=$2 AND user_id=$3',
  get_memberships:
    'SELECT DISTINCT U.id, U.name, C.role FROM course_memberships C, users U WHERE C.semester_name = $1 AND ' +
    'C.module_code = $2 AND C.user_id = U.id ORDER BY role DESC',
  delete_membership: 'DELETE FROM course_memberships WHERE semester_name = $1 AND module_code = $2 AND user_id = $3',
  get_users_not_in_course:
    'SELECT * FROM users WHERE NOT is_admin AND id NOT IN ' +
    '(SELECT user_id FROM course_memberships WHERE semester_name=$1 AND module_code=$2)',
  get_courses_by_user:
    'SELECT DISTINCT S.start_time, S.end_time, C.semester_name, C.module_code, C.title, C.description, C.credits, CM.role ' +
    'FROM courses C, course_memberships CM, semesters S ' +
    'WHERE S.name = C.semester_name AND C.semester_name = CM.semester_name AND C.module_code = CM.module_code AND ' +
    'CM.user_id = $1 ORDER BY semester_name, module_code',
  get_members_by_course:
    'SELECT * FROM course_memberships C JOIN users U ON C.user_id = U.id ' +
    'WHERE semester_name = $1 AND module_code=$2 AND role=$3'
};

course_memberships.functions = {
  is_member_in_course: 'SELECT is_member_in_course($1,$2,$3,$4)',
  add_course_members: 'SELECT add_course_members($1, $2, $3, $4)'
};

module.exports = course_memberships;
