const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { findCourse } = require('./helpers');
const { handleAccessDenied } = require('../permissions');
const { canShowCourseRequestsOfCourse } = require('../permissions/course_requests');

exports.index = async (req, res, next) => {
  const { requester_id, semester_name, module_code } = req.query;
  try {
    if (requester_id) {
      // Showing course requests for individual user
      if (req.user.id !== requester_id) {
        handleAccessDenied(req, res);
      }
      const requests = await db.query(sql.course_requests.queries.get_course_requests_of_student, [requester_id]).then(
        data => data.rows,
        err => {
          log.error(`Failed to get course requests submitted by ${req.user.name}`);
          next(err);
        }
      );
      res.render('courseRequests', {
        title: `Course requests submitted by ${req.user.name}`,
        course: null,
        requests
      });
    } else if (semester_name && module_code) {
      // Showing course requests for course
      if (!(await canShowCourseRequestsOfCourse(req.user, semester_name, module_code))) {
        handleAccessDenied(req, res);
      }
      const course = await findCourse(semester_name, module_code);
      const requests = await db
        .query(sql.course_requests.queries.get_course_requests_of_course, [semester_name, module_code])
        .then(
          data => data.rows,
          err => {
            log.error(`Failed to get course requests of course ${semester_name} ${module_code} ${course.title}`);
            next(err);
          }
        );
      res.render('courseRequests', {
        title: `Course requests of ${semester_name} ${module_code} ${course.title}`,
        course,
        requests
      });
    } else {
      // 404
      log.info('No query parameters supplied, defaulting to 404');
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.create = (req, res) => {
  const { semester_name, module_code, requester_id } = req.params;
  db.query(sql.course_requests.queries.create_course_request, [semester_name, module_code, requester_id])
    .then(
      () => {
        req.flash('success', 'Course request successfully created!');
      },
      err => {
        log.error('Failed to create course request.');
        req.flash('error', err.message);
      }
    )
    .then(() => res.redirect('back'));
};

exports.delete = (req, res) => {
  const { semester_name, module_code, requester_id } = req.params;
  db.query(sql.course_requests.queries.delete_course_request, [semester_name, module_code, requester_id])
    .then(
      () => req.flash('success', 'Successfully deleted course request'),
      err => {
        log.error('Failed to delete course request');
        req.flash('error', err.message);
      }
    )
    .then(() => res.redirect('back'));
};

exports.update = (req, res) => {
  const { semester_name, module_code, requester_id } = req.params;
  const { is_approved } = req.body;
  const action = is_approved ? 'approved' : 'rejected';
  db.query(sql.course_requests.queries.update_course_request, [semester_name, module_code, requester_id, is_approved])
    .then(
      () => {
        req.flash('success', `Successfully ${action} course request`);
      },
      err => {
        log.error(`Failed to ${action} course request`);
        req.flash('error', err.message);
      }
    )
    .then(() => res.redirect('back'));
};
