const course_requests = {};

course_requests.queries = {
  find_course_request:
    'SELECT * FROM course_requests WHERE semester_name = $1 AND module_code=$2 AND requester_id = $3',
  get_course_requests_professor:
    'SELECT CR.semester_name, CR.module_code, CR.requester_id, CR.is_approved, CR.requested_at, CR.closed_at, ' +
    'C.title FROM ' +
    'course_requests CR, course_memberships CM, courses C WHERE CR.semester_name = CM.semester_name AND ' +
    "CR.module_code = CM.module_code AND CM.user_id = $1 AND CM.role = 'professor' " +
    'AND C.semester_name = CR.semester_name AND C.module_code = CR.module_code ORDER BY CR.closed_at DESC, ' +
    'CR.requested_at DESC',
  get_course_requests_student:
    'SELECT C.semester_name, C.module_code, C.title, CR.requester_id, CR.requested_at, CR.is_approved, ' +
    'CR.closed_at FROM course_requests CR, courses C WHERE ' +
    'CR.semester_name = C.semester_name AND CR.module_code = C.module_code AND requester_id = $1 ORDER BY ' +
    'CR.closed_at DESC, CR.requested_at DESC',
  create_course_request:
    'INSERT INTO course_requests (requester_id, requested_at, semester_name, module_code) VALUES ' +
    '($1, current_timestamp(0), $2, $3)',
  update_course_request:
    'UPDATE course_requests SET is_approved = $1, closed_at = current_timestamp(0) WHERE requester_id = $2 AND ' +
    'semester_name = $3 AND module_code=$4',
  delete_course_request:
    'DELETE FROM course_requests WHERE requester_id = $1 AND semester_name = $2 AND module_code = $3',
  is_allowed_to_request:
    "select ((SELECT COUNT(user_id) FROM course_memberships WHERE role = 'professor' AND user_id = $1) +" +
    '(SELECT count(requester_id) FROM course_requests WHERE requester_id = $1 AND semester_name = $2 AND ' +
    'module_code = $3)) AS total'
};

module.exports = course_requests;
