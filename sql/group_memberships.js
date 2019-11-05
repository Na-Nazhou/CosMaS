const group_memberships = {};

group_memberships.queries = {
  find_membership:
    'SELECT * FROM group_memberships WHERE semester_name = $1 AND module_code=$2 AND group_name=$3 AND user_id=$4'
};

module.exports = group_memberships;
