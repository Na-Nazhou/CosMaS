const course_requests = {};

course_requests.queries = {
  find_course_request: 'SELECT * FROM course_requests WHERE semester_name=$1 AND module_code=$2 AND requester_id=$3',
  get_course_requests_of_course:
    'SELECT CR.semester_name, CR.module_code, CR.requester_id, CR.requested_at, CR.is_approved, CR.closed_at, U.name AS requester_name ' +
    'FROM course_requests CR LEFT JOIN users U ON CR.requester_id=U.id ' +
    'WHERE semester_name=$1 AND module_code=$2 ' +
    'ORDER BY closed_at DESC, requested_at ASC',
  get_course_requests_of_student:
    'SELECT * FROM course_requests CR NATURAL JOIN courses C ' +
    'WHERE CR.requester_id=$1 ' +
    'ORDER BY CR.requested_at DESC, CR.closed_at DESC',
  create_course_request:
    'INSERT INTO course_requests (semester_name, module_code, requester_id, requested_at) VALUES ($1, $2, $3, LOCALTIMESTAMP(0))',
  update_course_request:
    'UPDATE course_requests SET is_approved=$4, closed_at=LOCALTIMESTAMP(0) WHERE semester_name=$1 AND module_code=$2 AND requester_id=$3',
  delete_course_request: 'DELETE FROM course_requests WHERE semester_name=$1 AND module_code=$2 AND requester_id=$3'
};

module.exports = course_requests;
