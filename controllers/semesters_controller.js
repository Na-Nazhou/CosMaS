const sql_query = require('../sql');

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.create_get = function (req, res, next) {
  res.render('semesterNew');
}

exports.create_post = function (req, res, next) {
  var academic_year = req.body.academic_year;
  var semester_number = req.body.semester_number;
  var start_time = req.body.start_time;
  var end_time = req.body.end_time;

  pool.query(sql_query.query.create_semester, 
    [academic_year, semester_number, start_time, end_time], (err, data) => {
    if (err) {
      console.log("Cannot create semester");
      //TODO: refine error message
      req.flash('error', err.message);
      return res.redirect("/semesterNew");
    } else {
      req.flash('info', 'Semester successfully created!');
      //TODO: to be updated to /courses
      return res.redirect('/users');
    }
  })
}

// exports.delete = function (req, res, next) {
//   var academic_year = req.params.academic_year;
//   var semester_number = req.params.semester_number;
//   pool.query(sql_query.query.delete_semester, [academic_year, semester_number], (err, data) => {
//     if (err) {
//       console.log("Cannot delete semester");
//       return res.send({ error: err.message });
//     }
//     //TODO: to be updated to /courses
//     res.send({ redirectUrl: "/users" });
//   })
// }

// exports.update_get = function (req, res, next) {
//   var academic_year = req.params.academic_year;
//   var semester_number = req.params.semester_number;
//   pool.query(sql_query.query.find_semester, [academic_year, semester_number], (err, data) => {
//     if (err) console.log("Cannot find semester");
//     res.render('semesterEdit', { semester: data.rows[0] });
//   })
// }

// exports.update_put = function (req, res, next) {
//   var old_academic_year = req.params.academic_year;
//   var old_semester_number = req.params.semester_number;
  
//   var academic_year = req.body.academic_year;
//   var semester_number = req.body.semester_number;
//   var start_time = req.body.start_time;
//   var end_time = req.body.end_time;

//   pool.query(sql_query.query.update_semester, 
//     [academic_year, semester_number, start_time, end_time, old_academic_year, old_semester_number], 
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

