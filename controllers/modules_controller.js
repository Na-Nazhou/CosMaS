const router = require('express').Router();
const db = require('../db');
const sql = require('../sql');

// Index
router.get('/', (req, res) => {
  db.query(sql.modules.queries.get_modules, (err, data) => {
    if (err) console.error('Cannot get modules');
    res.render('modules', { data: data.rows });
  });
});

// Create
router.get('/new', (req, res) => {
  res.render('moduleNew');
});

router.post('/', (req, res) => {
  const { module_code } = req.body;

  db.query(sql.modules.queries.create_module, [module_code], err => {
    if (err) {
      console.error('Cannot create module');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/modules/new');
    }
    req.flash('info', 'Module successfully created!');
    return res.redirect('/modules');
  });
});

// Delete
router.delete('/:module_code*', (req, res) => {
  const module_code = req.params.module_code + req.params['0'];
  db.query(sql.modules.queries.delete_module, [module_code], err => {
    if (err) {
      console.error('Cannot delete module');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/modules' });
  });
});

// Update
router.get('/:module_code*/edit', (req, res) => {
  const module_code = req.params.module_code + req.params['0'];
  db.query(sql.modules.queries.find_module, [module_code], (err, data) => {
    if (err) console.error('Cannot find module');
    res.render('moduleEdit', { module: data.rows[0] });
  });
});

router.put('/:module_code*', (req, res) => {
  const old_module_code = req.params.module_code + req.params['0'];
  const { module_code } = req.body;

  db.query(sql.modules.queries.update_module, [module_code, old_module_code], err => {
    if (err) {
      console.error('Cannot update module');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/modules' });
  });
});

module.exports = router;
