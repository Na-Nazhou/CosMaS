const courses = {};

courses.queries = {
<<<<<<< HEAD
  find_course: 'SELECT * FROM courses WHERE semester_name=$1 AND module_code=$2',
  get_courses: 'SELECT * FROM courses ORDER BY module_code, semester_name',
  create_course: 'INSERT INTO courses (semester_name, module_code, title, description, credits) VALUES ($1, $2, $3, $4, $5)',
  update_course: 'UPDATE courses SET semester_name=$1, module_code=$2, title=$3, description=$4, credits=$5 WHERE semester_name=$6, module_code=$7',
  delete_course: 'DELETE FROM courses WHERE semester_name=$1 AND module_code=$2'
};

course.exports = courses;
=======
  find_course: 'SELECT * FROM courses WHERE semester_name = $1 AND module_code=$2',
  get_courses: 'SELECT * FROM courses ORDER BY semester_name, module_code',
  create_course:
    'INSERT INTO courses (semester_name, module_code, title, description, credits) VALUES ($1, $2, $3, $4, $5)',
  update_course:
    'UPDATE courses SET semester_name = $1, module_code = $2, title = $3, description = $4, credits = $5' +
    'WHERE semester_name = $6 AND module_code=$7',
  delete_course: 'DELETE FROM courses WHERE semester_name = $1 AND module_code = $2'
};

module.exports = courses;
>>>>>>> 0107ec1a8da863f45d2c8920fe86365c95e22522
