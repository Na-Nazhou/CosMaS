const sql = require('../sql');

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

// exports.delete = function (req, res, next) {
//   var name = req.params.name;
//   pool.query(sql.semesters.queries.delete_semester, [name], (err, data) => {
//     if (err) {
//       console.log("Cannot delete semester");
//       return res.send({ error: err.message });
//     }
//     //TODO: to be updated to /courses
//     res.send({ redirectUrl: "/users" });
//   })
// }

// exports.update_get = function (req, res, next) {
//   var name = req.params.name;
//   pool.query(sql.semesters.queries.find_semester, [name], (err, data) => {
//     if (err) console.log("Cannot find semester");
//     res.render('semesterEdit', { semester: data.rows[0] });
//   })
// }

// exports.update_put = function (req, res, next) {
//   var old_name = req.params.name;

//   var name = req.body.name;
//   var start_time = req.body.start_time;
//   var end_time = req.body.end_time;

//   pool.query(sql.semesters.queries.update_semester,
//     [name, start_time, end_time, old_name],
//     (err, data) => {
//     if (err) {
//       console.log("Cannot update user");
//       return res.send({ error: err.message });
//     } else {
//        //TODO: to be updated to /courses
//       return res.send({ redirectUrl: "/users" });
//     }
//   });
// }

