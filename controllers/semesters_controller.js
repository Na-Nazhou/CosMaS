const router = require('express').Router();
const { Pool } = require('pg');
const sql = require('../sql');
const { formatDate } = require('../helpers/data');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Index
router.get('/', (req, res) => {
  pool.query(sql.semesters.queries.get_semesters, (err, data) => {
    if (err) console.error('Cannot get semesters');
    data.rows.forEach(sem => {
      sem.start_time = formatDate(sem.start_time);
      sem.end_time = formatDate(sem.end_time);
    });
    res.render('semesters', { data: data.rows });
  });
});

// Create
router.get('/new', (req, res) => {
  res.render('semesterNew');
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  pool.query(sql.semesters.queries.create_semester, [name, start_time, end_time], err => {
    if (err) {
      console.error('Cannot create semester');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/semesters/new');
    }
    req.flash('info', 'Semester successfully created!');
    return res.redirect('/semesters');
  });
});

// Delete
router.delete('/:name*', (req, res) => {
  const name = req.params.name + req.params['0'];
  pool.query(sql.semesters.queries.delete_semester, [name], err => {
    if (err) {
      console.error('Cannot delete semester');
      res.send({ error: err.message });
    } else {
      res.send({ redirectUrl: '/semesters' });
    }
  });
});

// Update
router.get('/:name*/edit', (req, res) => {
  const name = req.params.name + req.params['0'];
  pool.query(sql.semesters.queries.find_semester, [name], (err, data) => {
    if (err) console.error('Cannot find semester');
    // TODO: refactor
    const semester = {
      name: data.rows[0].name,
      start_time: formatDate(data.rows[0].start_time),
      end_time: formatDate(data.rows[0].end_time)
    };
    res.render('semesterEdit', { semester });
  });
});

router.put('/:name*', (req, res) => {
  const old_name = req.params.name + req.params['0'];
  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  pool.query(sql.semesters.queries.update_semester, [name, start_time, end_time, old_name], err => {
    if (err) {
      console.error('Cannot update semester');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/semesters' });
  });
});

module.exports = router;
