const sql = require('../sql');

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.create_get = function (req, res, next) {
  res.render('moduleNew');
}

exports.create_post = function (req, res, next) {
  var module_code = req.body.module_code;

  pool.query(sql.modules.queries.create_module,
    [module_code], (err, data) => {
      if (err) {
        console.log("Cannot create module");
        //TODO: refine error message
        req.flash('error', err.message);
        return res.redirect("/modules/new");
      } else {
        req.flash('info', 'Module successfully created!');
        //TODO: to be updated to /courses
        return res.redirect('/users');
      }
    })
}
