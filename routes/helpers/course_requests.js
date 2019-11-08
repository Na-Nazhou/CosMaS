function courseRequestsPath() {
  return `/course_requests`;
}

function courseRequestPath(semester_name, module_code, requester_id) {
  return `${courseRequestsPath()}/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}/${requester_id}`;
}

module.exports = {
  courseRequestsPath,
  courseRequestPath
};
