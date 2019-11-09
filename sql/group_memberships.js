const group_memberships = {};

group_memberships.queries = {
  find_membership:
    'SELECT * FROM group_memberships WHERE semester_name = $1 AND module_code=$2 AND group_name=$3 AND user_id=$4',
  get_members_by_group:
    'SELECT U.name AS name, U.id AS user_id FROM group_memberships G JOIN users U ON G.user_id = U.id ' +
    'WHERE semester_name=$1 AND module_code=$2 AND group_name=$3 AND role=$4',
  get_members_not_in_group:
    'SELECT * FROM course_memberships C JOIN users U1 ON C.user_id = U1.id ' +
    'WHERE C.semester_name=$1 AND C.module_code=$2 AND C.role::text = $4 AND C.user_id NOT IN ' +
    '(SELECT user_id FROM group_memberships G ' +
    'WHERE G.semester_name=$1 AND G.module_code=$2 AND G.group_name = $3 AND G.role::text = $4)',
  delete_member:
    'DELETE FROM group_memberships WHERE semester_name = $1 AND module_code=$2 AND group_name=$3 AND user_id=$4'
};

group_memberships.functions = {
  updateTAs: 'SELECT update_TAs($1, $2, $3, $4)',
  updateStudents: 'SELECT update_students($1, $2, $3, $4)'
};

module.exports = group_memberships;
