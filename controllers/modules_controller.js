const { Pool } = require('pg');
const sql = require('../sql');

// Postgre SQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

exports.index = (req, res) => {
  pool.query(sql.modules.queries.get_modules, (err, data) => {
    if (err) console.log('Cannot get modules');
    res.render('modules', { data: data.rows });
  });
};

exports.create_get = (req, res) => {
  res.render('moduleNew');
};

exports.create_post = (req, res) => {
  const { module_code } = req.body;

  pool.query(sql.modules.queries.create_module, [module_code], err => {
    if (err) {
      console.log('Cannot create module');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/modules/new');
    }
    req.flash('info', 'Module successfully created!');
    return res.redirect('/modules');
  });
};

exports.delete = (req, res) => {
  const module_code = req.params.module_code + req.params['0'];
  pool.query(sql.modules.queries.delete_module, [module_code], err => {
    if (err) {
      console.log('Cannot delete module');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/modules' });
  });
};

exports.update_get = (req, res) => {
  const module_code = req.params.module_code + req.params['0'];
  pool.query(sql.modules.queries.find_module, [module_code], (err, data) => {
    if (err) console.log('Cannot find module');
    res.render('moduleEdit', { module: data.rows[0] });
  });
};

exports.update_put = (req, res) => {
  const old_module_code = req.params.module_code + req.params['0'];

  const { module_code } = req.body;

  pool.query(sql.modules.queries.update_module, [module_code, old_module_code], err => {
    if (err) {
      console.log('Cannot update module');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/modules' });
  });
};
