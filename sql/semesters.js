const semesters = {};

semesters.queries = {
  find_semester: 'SELECT * FROM semesters WHERE name=$1',
  get_semesters: 'SELECT * FROM semesters ORDER BY start_time DESC',
  create_semester: 'INSERT INTO semesters (name, start_time, end_time) VALUES ($1,$2,$3)',
  update_semester: 'UPDATE semesters SET name=$1,start_time=$2,end_time=$3 WHERE name=$4',
  delete_semester: 'DELETE FROM semesters WHERE name=$1',
};

semesters.functions = {
  //TODO: Returns true if there are no overlapping intervals
  no_overlapp: '',
}

module.exports = semesters;
