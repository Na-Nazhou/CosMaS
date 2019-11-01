const modules = {};

modules.queries = {
  get_modules: 'SELECT * FROM modules ORDER BY module_code',
  create_module: 'INSERT INTO modules (module_code) VALUES ($1)',
  delete_module: 'DELETE FROM modules WHERE module_code=$1'
};

module.exports = modules;
