const sql_query = require('../sql');
const bcrypt = require('bcrypt')

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.index = function (req, res, next) {
  pool.query(sql_query.query.get_users, (err, data) => {
    if (err) console.log("Cannot get users");
    res.render('users', { data: data.rows });
  });
}

exports.create_get = function (req, res, next) {
  res.render('signup');
}

exports.create_post = function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  var raw_password = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var password_digest = bcrypt.hashSync(raw_password, salt);

  pool.query(sql_query.query.create_user, [id, name, password_digest], (err, data) => {
    if (err) console.log("Cannot create user");
    res.redirect('/');
  });
}

exports.delete = function (req, res, next) {
  var id = req.params.id;
  pool.query(sql_query.query.delete_user, [id], (err, data) => {
    if (err) console.log("Cannot delete user");
    res.send({ redirectUrl: "/users" });
  })
}

exports.update_get = function (req, res, next) {
  pool.query(sql_query.query.find_user_by_id, [req.params.id], (err, data) => {
    if (err) console.log("Cannot find user");
    res.render('userEdit', { user: data.rows[0] });
  })
}

exports.update_put = function (req, res, next) {
  var orginalId = req.params.id;
  var id = req.body.id;
  var name = req.body.name;
  var raw_password = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var password_digest = bcrypt.hashSync(raw_password, salt);

  pool.query(sql_query.query.update_user, [id, name, password_digest, orginalId], (err, data) => {
    if (err) console.log("Cannot update user");
    res.send({ redirectUrl: "/users" });
  });
}


