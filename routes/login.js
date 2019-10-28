var express = require('express');
var router = express.Router();
var passport = require('passport')

router.get('/',
    function (req, res) {
        res.render('login');
    });

router.post('/',
    passport.authenticate('local', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

module.exports = router;
