const sql = require('../sql');
const bcrypt = require('bcrypt')

// Postgre SQL Connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

exports.login_get = function (req, res) {
  res.render('login');
}

exports.logout_get = function(req, res) {
  req.session.destroy();
  req.logout();
  res.redirect('/');
}

exports.index = function (req, res, next) {
  pool.query(sql.users.queries.get_users, (err, data) => {
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

  pool.query(sql.users.queries.create_user, [id, name, password_digest], (err, data) => {
    if (err) {
      console.log("Cannot create user");
      //TODO: refine error message
      req.flash('error', err.message);
      return res.redirect("/signup");
    } else {
      req.login({id: id, password: raw_password}, function (err) {
        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }
      })
    }
  });
}

exports.delete = function (req, res, next) {
  var id = req.params.id;
  pool.query(sql.users.queries.delete_user, [id], (err, data) => {
    if (err) {
      console.log("Cannot delete user");
      return res.send({ error: err.message });
    }
    // Log out the user during self-deletion
    if (req.user.id == id) {
      req.logout();
      return res.send({ redirectUrl: "/" });
    }
    res.send({ redirectUrl: "/users" });
  })
}

exports.update_get = function (req, res, next) {
  pool.query(sql.users.queries.find_user_by_id, [req.params.id], (err, data) => {
    if (err) console.log("Cannot find user");
    res.render('userEdit', { user: data.rows[0] });
  })
}

exports.update_put = function (req, res, next) {
  var orginalId = req.params.id;
  //TODO: update when edit id is supported
  var id = req.body.id || req.params.id;
  var name = req.body.name;
  var raw_password = req.body.password;
  var salt = bcrypt.genSaltSync(10);
  var password_digest = bcrypt.hashSync(raw_password, salt);

  pool.query(sql.users.queries.update_user, [id, name, password_digest, orginalId], (err, data) => {
    if (err) {
      console.log("Cannot update user");
      return res.send({ error: err.message });
    } else {
      return res.send({ redirectUrl: "/users" });
    }
  });
}


