const courses = {};

courses.queries = {
  find_course: 'SELECT * FROM courses WHERE semester_name = $1 AND module_code=$2',
  get_courses: 'SELECT * FROM courses ORDER BY semester_name, module_code',
  get_courses_by_semester: 'SELECT * FROM courses WHERE semester_name = $1 ORDER BY semester_name, module_code',
  get_courses_by_module: 'SELECT * FROM courses WHERE module_code = $1 ORDER BY semester_name, module_code',
  create_course:
    'INSERT INTO courses (semester_name, module_code, title, description, credits) VALUES ($1, $2, $3, $4, $5)',
  update_course:
    'UPDATE courses SET semester_name = $1, module_code = $2, title = $3, description = $4, credits = $5' +
    'WHERE semester_name = $6 AND module_code=$7',
  delete_course: 'DELETE FROM courses WHERE semester_name = $1 AND module_code = $2'
};

module.exports = courses;
