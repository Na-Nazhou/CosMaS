const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const engine = require('ejs-locals');
const cors = require('cors');
const methodOverride = require('method-override');
require('dotenv').config();
const router = require('./routes');
const log = require('./helpers/logging');

const app = express();

// Session & Auth Setup
require('./auth').init(app);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 604800000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// View Engine Setup
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./routes/helpers').initViewHelpers(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// PUT and DELETE method override
/* eslint-disable no-underscore-dangle */
app.use(
  methodOverride(req => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
    return undefined;
  })
);
/* eslint-enable no-underscore-dangle */

// Flash Messages Setup
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = req.flash.bind(req);
  next();
});

// Router Setup
app.use((req, res, next) => {
  log.info('===================================================');
  log.route(`Processing request ${req.method} ${req.path}`);
  next();
});
app.use(router);

// Catch-all Error Handler
app.use((err, req, res, next) => {
  log.fatal('Unhandled error');
  res.render('500');
  next(err);
});

module.exports = app;
