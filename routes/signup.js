var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const round = 10;
const salt = bcrypt.genSaltSync(round);

/* SQL Query */
var sql_query = 'INSERT INTO users VALUES';

// GET
router.get('/', function (req, res, next) {
    res.render('signup', { title: 'Sign up' });
});

// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var id = req.body.id;
    var name = req.body.name;
    var raw_password = req.body.password;
    var password_digest = bcrypt.hashSync(raw_password, salt);

    // Construct Specific SQL Query
    var insert_query = sql_query + "('" + id + "','" + name + "', false, '" + password_digest + "')";

    pool.query(insert_query, (err, data) => {
        res.redirect('/users')
    });
});

module.exports = router;
