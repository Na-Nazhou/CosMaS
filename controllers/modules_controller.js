const db = require('../db');
const sql = require('../sql');

exports.index = (req, res, next) => {
  db.query(sql.modules.queries.get_modules, (err, data) => {
    if (err) {
      console.error('Failed to get modules');
      next(err);
    } else {
      res.render('modules', { data: data.rows });
    }
  });
};

exports.new = (req, res) => {
  res.render('moduleNew');
};

exports.create = (req, res) => {
  const { module_code } = req.body;

  db.query(sql.modules.queries.create_module, [module_code], err => {
    if (err) {
      console.error('Failed to create module');
      // TODO: refine error message
      req.flash('error', err.message);
      res.render('moduleNew');
    } else {
      req.flash('success', 'Module successfully created!');
      res.redirect('/modules');
    }
  });
};

exports.delete = (req, res) => {
  const { module_code } = req.params;
  db.query(sql.modules.queries.delete_module, [module_code], err => {
    if (err) {
      console.error('Failed to delete module');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Module ${module_code} has been successfully deleted`);
    }
    res.redirect('/modules');
  });
};

exports.edit = (req, res, next) => {
  const { module_code } = req.params;
  db.query(sql.modules.queries.find_module, [module_code], (err, data) => {
    if (err) {
      console.error('Failed to find module');
      next(err);
    } else {
      res.render('moduleEdit', { module: data.rows[0] });
    }
  });
};

exports.update = (req, res) => {
  const old_module_code = req.params.module_code;
  const { module_code } = req.body;

  db.query(sql.modules.queries.update_module, [module_code, old_module_code], err => {
    if (err) {
      console.error('Failed to update module');
      req.flash('error', err.message);
      res.render('moduleEdit', { module: { module_code: old_module_code } });
    } else {
      req.flash('success', 'Module successfully updated!');
      res.redirect('/modules');
    }
  });
};
