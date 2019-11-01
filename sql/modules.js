const modules = {};

modules.queries = {
  find_module: 'SELECT * FROM modules WHERE module_code=$1',
  get_modules: 'SELECT * FROM modules ORDER BY module_code',
  create_module: 'INSERT INTO modules (module_code) VALUES ($1)',
  update_module: 'UPDATE modules SET module_code=$1 WHERE module_code=$2',
  delete_module: 'DELETE FROM modules WHERE module_code=$1'
};

module.exports = modules;
