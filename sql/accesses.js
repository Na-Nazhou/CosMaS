const accesses = {};

accesses.queries = {
  find_accesss:
    'SELECT * FROM accesses A NATURAL JOIN group_memberships GM' +
    'WHERE semester_name=$1 AND module_code=$2 AND forum_title=$3 AND user_id=4'
};

module.exports = accesses;
