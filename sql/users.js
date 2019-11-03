const users = {};

users.queries = {
  find_user_by_id: 'SELECT * FROM users WHERE id=$1',
  get_users: 'SELECT * FROM users',
  create_user: 'INSERT INTO users (id, name, password_digest) VALUES ($1,$2,$3)', // normal user
  // create_admin: 'INSERT INTO users VALUES ($1,$2, true, $3)', // admin user
  update_user: 'UPDATE users SET id=$1,name=$2,password_digest=$3 WHERE id=$4',
  delete_user: 'DELETE FROM users WHERE id=$1',
  get_user_courses:
    'SELECT DISTINCT C.semester_name, C.module_code, C.title, C.description, C.credits, CM.role FROM courses C, ' +
    'course_memberships CM WHERE C.semester_name = CM.semester_name AND C.module_code = CM.module_code AND ' +
    'CM.user_id = $1 ORDER BY semester_name, module_code'
};

module.exports = users;
