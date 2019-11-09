const semesters = {};

semesters.queries = {
  find_semester: 'SELECT * FROM semesters WHERE name=$1',
  get_semesters: 'SELECT * FROM semesters ORDER BY start_time DESC',
  create_semester: 'INSERT INTO semesters (name, start_time, end_time) VALUES ($1,$2,$3)',
  update_semester: 'UPDATE semesters SET name=$1, start_time=$2, end_time=$3 WHERE name=$4',
  delete_semester: 'DELETE FROM semesters WHERE name=$1',
  get_current_semester:
    'SELECT * FROM semesters WHERE start_time <= LOCALTIMESTAMP(0) AND end_time >= LOCALTIMESTAMP(0)'
};

module.exports = semesters;
