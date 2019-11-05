function modulesPath() {
  return '/modules';
}

function modulePath(module_code) {
  return `${modulesPath()}/${encodeURIComponent(module_code)}`;
}

function moduleNewPath() {
  return `${modulesPath()}/new`;
}

function moduleEditPath(module_code) {
  return `${modulePath(module_code)}/edit`;
}

module.exports = {
  modulesPath,
  modulePath,
  moduleNewPath,
  moduleEditPath
};
