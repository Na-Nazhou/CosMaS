const forums = {};

forums.queries = {
  find_forum: 'SELECT * FROM forums WHERE semester_name=$1 AND module_code=$2 AND title=$3',
  get_forums_by_course: 'SELECT * FROM forums WHERE semester_name=$1 AND module_code=$2',
  create_forum: 'INSERT INTO forums (semester_name, module_code, title) VALUES ($1, $2, $3)',
  update_forum: 'UPDATE forums SET title=$4 WHERE semester_name=$1 AND module_code=$2 AND title=$3',
  delete_forum: 'DELETE FROM forums WHERE semester_name=$1 AND module_code=$2 AND title=$3'
};

module.exports = forums;
