const db = require('../db');
const sql = require('../sql');
const { formatDate } = require('../helpers/data');
const log = require('../helpers/logging');

exports.index = (req, res, next) => {
  db.query(sql.semesters.queries.get_semesters, (err, data) => {
    if (err) {
      log.error('Failed to get semesters');
      next(err);
    } else {
      data.rows.forEach(sem => {
        sem.start_time = formatDate(sem.start_time);
        sem.end_time = formatDate(sem.end_time);
      });
      res.render('semesters', { data: data.rows });
    }
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
      log.error('Failed to create semester');
      // TODO: refine error message
      req.flash('error', err.message);
      res.redirect('/semesters/new');
    } else {
      req.flash('success', `Semester ${name} has been successfully created!`);
      res.redirect('/semesters');
    }
  });
};

exports.delete = (req, res) => {
  const { name } = req.params;
  db.query(sql.semesters.queries.delete_semester, [name], err => {
    if (err) {
      log.error('Failed to delete semester');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Semester ${name} has been successfully deleted!`);
    }
    res.redirect('/semesters');
  });
};

exports.edit = (req, res, next) => {
  const { name } = req.params;
  db.query(sql.semesters.queries.find_semester, [name], (err, data) => {
    if (err) {
      log.error('Failed to find semester');
      next(err);
    } else {
      const semester = {
        name: data.rows[0].name,
        start_time: formatDate(data.rows[0].start_time),
        end_time: formatDate(data.rows[0].end_time)
      };
      res.render('semesterEdit', { semester });
    }
  });
};

exports.update = (req, res) => {
  const old_name = req.params.name;
  const { name } = req.body;
  const { start_time } = req.body;
  const { end_time } = req.body;

  db.query(sql.semesters.queries.update_semester, [name, start_time, end_time, old_name], err => {
    if (err) {
      log.error('Failed to update semester');
      req.flash('error', err.message);
      res.render('semesterEdit', { semester: { name: old_name, start_time, end_time } });
    } else {
      req.flash('success', 'Semester has been successfully updated!');
      res.redirect('/semesters');
    }
  });
};
