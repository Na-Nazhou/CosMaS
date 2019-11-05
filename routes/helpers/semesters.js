function semestersPath() {
  return '/semesters';
}

function semesterPath(semester_name) {
  return `${semestersPath()}/${encodeURIComponent(semester_name)}`;
}

function semesterNewPath() {
  return `${semestersPath()}/new`;
}

function semesterEditPath(semester_name) {
  return `${semesterPath(semester_name)}/edit`;
}

module.exports = {
  semestersPath,
  semesterPath,
  semesterNewPath,
  semesterEditPath
};
