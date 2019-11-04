function coursesPath() {
  return '/courses';
}

function coursePath(semester_name, module_code) {
  return `${coursesPath()}/${encodeURIComponent(semester_name)}/${encodeURIComponent(module_code)}`;
}

module.exports = {
  coursesPath,
  coursePath
};
