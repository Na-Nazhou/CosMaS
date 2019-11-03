const groups = {};

groups.queries = {
  find_group: 'SELECT * FROM groups WHERE semester_name = $1 AND module_code=$2 AND name = $3',
  get_groups: 'SELECT * FROM groups ORDER BY semester_name, module_code, name',
  create_group: 'INSERT INTO groups (semester_name, module_code, name) VALUES ($1, $2, $3)',
  update_group:
    'UPDATE groups SET semester_name = $1, module_code = $2, name = $3' +
    'WHERE semester_name = $4 AND module_code = $5 AND name = $6',
  delete_group: 'DELETE FROM groups WHERE semester_name = $1 AND module_code=$2 AND name = $3'
};

module.exports = groups;
