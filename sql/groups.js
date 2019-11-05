const groups = {};

groups.queries = {
  find_group: 'SELECT * FROM groups WHERE semester_name = $1 AND module_code=$2 AND name = $3',
  get_groups_by_course: 'SELECT * FROM groups WHERE semester_name=$1 AND module_code=$2',
  create_group: 'INSERT INTO groups (semester_name, module_code, name) VALUES ($1, $2, $3)',
  update_group: 'UPDATE groups SET name=$4 WHERE semester_name=$1 AND module_code=$2 AND name=$3',
  delete_group: 'DELETE FROM groups WHERE semester_name = $1 AND module_code=$2 AND name = $3'
};

module.exports = groups;
