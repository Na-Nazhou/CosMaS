function coursesPath() {
  return '/courses';
}

function coursePath(semester_name, module_code) {
  return `${coursesPath()}/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}`;
}

function courseNewPath() {
  return `${coursesPath()}/new`;
}

function courseEditPath(semester_name, module_code) {
  return `${coursePath(semester_name, module_code)}/edit`;
}

module.exports = {
  coursesPath,
  coursePath,
  courseNewPath,
  courseEditPath
};
