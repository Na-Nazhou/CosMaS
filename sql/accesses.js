const accesses = {};

accesses.queries = {
  find_accesss:
    'SELECT * FROM accesses A NATURAL JOIN group_memberships GM' +
    'WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND user_id=4',
  get_group_names_by_forum:
    'SELECT group_name FROM accesses A WHERE A.semester_name = $1 AND A.module_code = $2 AND A.forum_title = $3'
};

accesses.functions = {};

module.exports = accesses;
