const { Pool } = require('pg');
const sql = require('../sql');

// Postgre SQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.create_get = (req, res) => {
  res.render('moduleNew');
};

exports.create_post = (req, res) => {
  const { module_code } = req.body;

  pool.query(sql.modules.queries.create_module,
    [module_code], (err) => {
      if (err) {
        console.log('Cannot create module');
        // TODO: refine error message
        req.flash('error', err.message);
        return res.redirect('/modules/new');
      }
      req.flash('info', 'Module successfully created!');
      // TODO: to be updated to /courses
      return res.redirect('/users');
    });
};
