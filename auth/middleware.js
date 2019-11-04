const db = require('../db');
const course_memberships = require('../sql/course_memberships');

const handleAccessDenied = (req, res, msg) => {
  req.flash('error', `Access Denied: ${msg}`);
  res.status(403);
  res.redirect('back');
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.ensureUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

exports.ensureIsAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    handleAccessDenied(req, res, 'Only admin is authorised to access');
  }
};

exports.ensureIsSameUser = (req, res, next) => {
  if (req.user.is_admin || req.params.id === req.user.id) {
    next();
  } else {
    handleAccessDenied(req, res, 'Unauthorised to edit this user');
  }
};

exports.ensureIsInCourse = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    db.query(
      course_memberships.queries.find_membership,
      [req.params.semester_name, req.params.module_code, req.user.id],
      (err, data) => {
        if (err) {
          req.flash('error', err.message);
          res.redirect('back');
        } else if (data.rows.length === 1) {
          next();
        } else {
          handleAccessDenied(req, res, 'Only course member is authorised to access');
        }
      }
    );
  }
};

exports.ensureIsProfessorInCourse = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    db.query(
      course_memberships.functions.is_member_in_course,
      [req.user.id, req.params.semester_name, req.params.module_code, 'professor'],
      (err, data) => {
        if (err) {
          req.flash('error', err.message);
          res.redirect('back');
        } else if (data.rows[0].is_member_in_course) {
          next();
        } else {
          handleAccessDenied(req, res, 'Only course professor is authorised to access');
        }
      }
    );
  }
};
