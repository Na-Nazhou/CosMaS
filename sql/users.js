const users = {};

users.queries = {
  find_user_by_id: 'SELECT * FROM users WHERE id=$1',
  get_users: 'SELECT * FROM users',
  create_user: 'INSERT INTO users (id, name, password_digest) VALUES ($1,$2,$3)', // normal user
  // create_admin: 'INSERT INTO users VALUES ($1,$2, true, $3)', // admin user
  update_user: 'UPDATE users SET id=$1,name=$2,password_digest=$3 WHERE id=$4',
  delete_user: 'DELETE FROM users WHERE id=$1',
  find_most_diligent_students:
    'WITH StudentInfo AS (SELECT CM.user_id id, COUNT(*) numCourses, SUM(C.credits) totalCredits ' +
    'FROM course_memberships CM, courses C WHERE CM.semester_name = C.semester_name AND ' +
    "CM.module_code = C.module_code AND C.semester_name = $1 AND CM.role='student' GROUP BY CM.user_id UNION " +
    "SELECT id, 0, 0 FROM users WHERE id NOT IN (SELECT user_id FROM course_memberships WHERE role='student')) " +
    'SELECT U.id, U.name, numCourses num_courses, totalCredits total_credits FROM StudentInfo S, Users U WHERE ' +
    'S.id = U.id ORDER BY numCourses DESC, totalCredits DESC, id LIMIT 5'
};

module.exports = users;
