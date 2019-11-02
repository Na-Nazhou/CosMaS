const db = require('../db');
const sql = require('../sql');
const { formatDate } = require('../helpers/data');

exports.index = (req, res) => {
  db.query(sql.semesters.queries.get_semesters, (err, data) => {
    if (err) console.error('Cannot get semesters');
    data.rows.forEach(sem => {
      sem.start_time = formatDate(sem.start_time);
      sem.end_time = formatDate(sem.end_time);
    });
    res.render('semesters', { data: data.rows });
  });
};

exports.new = (req, res) => {
  res.render('semesterNew');
};

exports.create = (req, res) => {
  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  db.query(sql.semesters.queries.create_semester, [name, start_time, end_time], err => {
    if (err) {
      console.error('Cannot create semester');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/semesters/new');
    }
    req.flash('info', 'Semester successfully created!');
    return res.redirect('/semesters');
  });
};

exports.delete = (req, res) => {
  const { name } = req.params;
  db.query(sql.semesters.queries.delete_semester, [name], err => {
    if (err) {
      console.error('Cannot delete semester');
      res.send({ error: err.message });
    } else {
      res.send({ redirectUrl: '/semesters' });
    }
  });
};

exports.edit = (req, res) => {
  const { name } = req.params;
  db.query(sql.semesters.queries.find_semester, [name], (err, data) => {
    if (err) console.error('Cannot find semester');
    // TODO: refactor
    const semester = {
      name: data.rows[0].name,
      start_time: formatDate(data.rows[0].start_time),
      end_time: formatDate(data.rows[0].end_time)
    };
    res.render('semesterEdit', { semester });
  });
};

exports.update = (req, res) => {
  const old_name = req.params.name;
  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  db.query(sql.semesters.queries.update_semester, [name, start_time, end_time, old_name], err => {
    if (err) {
      console.error('Cannot update semester');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/semesters' });
  });
};
