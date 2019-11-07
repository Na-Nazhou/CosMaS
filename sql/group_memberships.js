const group_memberships = {};

group_memberships.queries = {
  find_membership:
    'SELECT * FROM group_memberships WHERE semester_name = $1 AND module_code=$2 AND group_name=$3 AND user_id=$4',
  get_members_by_group:
    'SELECT * FROM group_memberships G JOIN users U ON G.user_id = U.id ' +
    'WHERE semester_name=$1 AND module_code=$2 AND group_name = $3 AND role = $4',
  delete_member:
    'DELETE FROM group_memberships WHERE semester_name = $1 AND module_code=$2 AND group_name=$3 AND user_id=$4'
};

module.exports = group_memberships;
