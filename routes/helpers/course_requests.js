function courseRequestsPath() {
  return `/course_requests`;
}

function courseRequestPath(semester_name, module_code, requester_id) {
  return `${courseRequestsPath()}/${encodeURIComponent(semester_name)}/${encodeURIComponent(
    module_code
  )}/${requester_id}`;
}

function courseRequestCourseShowPath(semester_name, module_code) {
  return `${courseRequestsPath()}/?semester_name=${encodeURIComponent(semester_name)}&module_code=${encodeURIComponent(
    module_code
  )}`;
}

function courseRequestStudentShowPath(student_id) {
  return `${courseRequestsPath()}/?requester_id=${student_id}`;
}

module.exports = {
  courseRequestsPath,
  courseRequestPath,
  courseRequestCourseShowPath,
  courseRequestStudentShowPath
};
