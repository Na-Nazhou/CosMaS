const toDate = require('date-fns/toDate');
const format = require('date-fns/format');

// Postgre SQL Connection
const { Pool } = require('pg');
const sql = require('../sql');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/* HELPERS */
function formatDate(dateString) {
  return format(toDate(dateString), 'yyyy-MM-dd');
}

exports.index = (req, res) => {
  pool.query(sql.semesters.queries.get_semesters, (err, data) => {
    if (err) console.log('Cannot get semesters');
    // TODO: format datetime
    data.rows.forEach((sem) => {
      sem.start_time = formatDate(sem.start_time);
      sem.end_time = formatDate(sem.end_time);
    });
    res.render('semesters', { data: data.rows });
  });
};

exports.create_get = (req, res) => {
  res.render('semesterNew');
};

exports.create_post = (req, res) => {
  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  pool.query(sql.semesters.queries.create_semester,
    [name, start_time, end_time], (err) => {
      if (err) {
        console.log('Cannot create semester');
        // TODO: refine error message
        req.flash('error', err.message);
        return res.redirect('/semesters/new');
      }
      req.flash('info', 'Semester successfully created!');
      return res.redirect('/semesters');
    });
};

exports.delete = (req, res) => {
  const name = req.params.name + req.params['0'];
  pool.query(sql.semesters.queries.delete_semester, [name], (err) => {
    if (err) {
      console.log('Cannot delete semester');
      res.send({ error: err.message });
    } else {
      res.send({ redirectUrl: '/semesters' });
    }
  });
};

exports.update_get = (req, res) => {
  const name = req.params.name + req.params['0'];
  pool.query(sql.semesters.queries.find_semester, [name], (err, data) => {
    if (err) console.log('Cannot find semester');
    // TODO: refactor
    const semester = {
      name: data.rows[0].name,
      start_time: formatDate(data.rows[0].start_time),
      end_time: formatDate(data.rows[0].end_time)
    };
    res.render('semesterEdit', { semester });
  });
};

exports.update_put = (req, res) => {
  const old_name = req.params.name + req.params['0'];

  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  pool.query(sql.semesters.queries.update_semester,
    [name, start_time, end_time, old_name],
    (err) => {
      if (err) {
        console.log('Cannot update semester');
        return res.send({ error: err.message });
      }
      return res.send({ redirectUrl: '/semesters' });
    });
};
