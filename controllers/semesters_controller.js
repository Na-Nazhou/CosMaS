const sql = require('../sql');
var toDate = require('date-fns/toDate')
var format = require('date-fns/format')

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.index = function (req, res, next) {
  pool.query(sql.semesters.queries.get_semesters, (err, data) => {
    if (err) console.log("Cannot get semesters");
    //TODO: format datetime
    res.render('semesters', { data: data.rows });
  });
}

exports.create_get = function (req, res, next) {
  res.render('semesterNew');
}

exports.create_post = function (req, res, next) {
  var name = req.body.name;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;

  pool.query(sql.semesters.queries.create_semester,
    [name, start_time, end_time], (err, data) => {
    if (err) {
      console.log("Cannot create semester");
      //TODO: refine error message
      req.flash('error', err.message);
      return res.redirect("/semesters/new");
    } else {
      req.flash('info', 'Semester successfully created!');
      //TODO: to be updated to /courses
      return res.redirect('/users');
    }
  })
}

exports.delete = function (req, res, next) {
  var name = req.params.name + req.params['0'];
  pool.query(sql.semesters.queries.delete_semester, [name], (err, data) => {
    if (err) {
      console.log("Cannot delete semester");
      return res.send({ error: err.message });
    }
    res.send({ redirectUrl: "/semesters" });
  })
}

exports.update_get = function (req, res, next) {
  var name = req.params.name + req.params['0'];
  pool.query(sql.semesters.queries.find_semester, [name], (err, data) => {
    if (err) console.log("Cannot find semester");
    //TODO: refactor
    var semester = {
      name: data.rows[0].name,
      start_time: format(toDate(data.rows[0].start_time), 'yyyy-MM-dd'),
      end_time: format(toDate(data.rows[0].end_time), 'yyyy-MM-dd'),
    }
    res.render('semesterEdit', { semester: semester });
  })
}

exports.update_put = function (req, res, next) {
  var old_name = req.params.name + req.params['0'];
  
  var name = req.body.name;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;

  pool.query(sql.semesters.queries.update_semester, 
    [name, start_time, end_time, old_name], 
    (err, data) => {
    if (err) {
      console.log("Cannot update semester");
      return res.send({ error: err.message });
    } else {
      return res.send({ redirectUrl: "/semesters" });
    }
  });
}


