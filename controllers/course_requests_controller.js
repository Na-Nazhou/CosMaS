const db = require('../db');
const sql = require('../sql');
const { formatDate } = require('../helpers/data');
const log = require('../helpers/logging');
const { courseRequestsPath } = require('../routes/helpers/course_requests');
const { coursePath } = require('../routes/helpers/courses');

exports.index = (req, res, next) => {
  const user_id = req.user.id;
  db.query(
    sql.course_requests.queries.get_course_requests_professor,
    [user_id],
    (err_professor, course_requests_professor) => {
      if (err_professor) {
        log.error('Failed to get courses requests for professor');
        next(err_professor);
      } else {
        course_requests_professor.rows.forEach(request => {
          Object.assign(request, {
            requested_at: formatDate(request.requested_at),
            closed_at: formatDate(request.closed_at)
          });
        });
        db.query(
          sql.course_requests.queries.get_course_requests_student,
          [user_id],
          (err_student, course_requests_student) => {
            if (err_student) {
              log.error('Failed to get courses requests for student');
              next(err_student);
            } else {
              course_requests_student.rows.forEach(request => {
                Object.assign(request, {
                  requested_at: formatDate(request.requested_at),
                  closed_at: formatDate(request.closed_at)
                });
              });
              res.render('courseRequests', {
                professor: course_requests_professor.rows,
                student: course_requests_student.rows
              });
            }
          }
        );
      }
    }
  );
};

exports.create = (req, res) => {
  const { requester_id } = req.body;
  const { semester_name } = req.body;
  const { module_code } = req.body;

  db.query(sql.course_requests.queries.create_course_request, [requester_id, semester_name, module_code], err => {
    if (err) {
      log.error('Cannot create course request!');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect(coursePath(semester_name, module_code));
    }

    req.flash('success', 'Course request successfully created!');
    return res.redirect(courseRequestsPath(requester_id));
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const { semester_name } = req.params;
  const { module_code } = req.params;

  db.query(sql.course_requests.queries.delete_course_request, [id, semester_name, module_code], err => {
    if (err) {
      log.error('Failed to delete course request');
      req.flash('error', err.message);
    } else {
      req.flash('success', 'Successfully deleted course request');
    }
    res.redirect(courseRequestsPath(id));
  });
};

exports.update = (req, res) => {
  const { is_approved } = req.body;
  const { requester_id } = req.body;
  const { semester_name } = req.body;
  const { module_code } = req.body;

  db.query(
    sql.course_requests.queries.update_course_request,
    [is_approved, requester_id, semester_name, module_code],
    err => {
      if (err) {
        log.error('Failed to update course request');
        req.flash('error', err.message);
        res.redirect(courseRequestsPath(req.user.id));
      } else {
        const message = is_approved ? 'approved' : 'rejected';
        req.flash('success', `Successfully ${message} course request`);
        res.redirect(courseRequestsPath(req.user.id));
      }
    }
  );
};
