const db = require('../db');
const sql = require('../sql');
const log = require('../helpers/logging');
const { canCreateCourse, canDeleteCourse } = require('../permissions/courses');
const { canAddMember, canAddTa, canViewMembers } = require('../permissions/course_memberships');
const { canRequestCourse } = require('../permissions/course_requests');
const { canCreateForum, canUpdateForum, canDeleteForum } = require('../permissions/forums');
const { canCreateGroup, canUpdateGroup, canDeleteGroup } = require('../permissions/groups');
const { coursesPath, courseNewPath, courseEditPath } = require('../routes/helpers/courses');

exports.index = async (req, res, next) => {
  const { semester_name, module_code } = req.query;
  try {
    const permissions = {
      can_create_course: await canCreateCourse(req.user),
      can_delete_course: await canDeleteCourse(req.user)
    };

    if (semester_name) {
      db.query(sql.courses.queries.get_courses_by_semester, [semester_name], (err, data) => {
        if (err) {
          log.error(`Failed to get courses offered in ${semester_name}`);
          next(err);
        } else {
          res.render('courses', { data: data.rows, title: `Courses offered in ${semester_name}`, permissions });
        }
      });
    } else if (module_code) {
      db.query(sql.courses.queries.get_courses_by_module, [module_code], (err, data) => {
        if (err) {
          log.error(`Failed to get courses for ${module_code}`);
          next(err);
        } else {
          res.render('courses', { data: data.rows, title: `Courses for module ${module_code}`, permissions });
        }
      });
    } else {
      db.query(sql.courses.queries.get_courses, (err, data) => {
        if (err) {
          log.error('Failed to get courses');
          next(err);
        } else {
          res.render('courses', { data: data.rows, title: 'All courses', permissions });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res, next) => {
  const { semester_name, module_code } = req.params;
  try {
    const permissions = {
      can_add_member: await canAddMember(req.user),
      can_add_ta: await canAddTa(req.user, semester_name, module_code),
      can_view_members: await canViewMembers(req.user, semester_name, module_code),
      can_create_group: await canCreateGroup(req.user, semester_name, module_code),
      can_update_group: await canUpdateGroup(req.user, semester_name, module_code),
      can_delete_group: await canDeleteGroup(req.user, semester_name, module_code),
      can_create_forum: await canCreateForum(req.user, semester_name, module_code),
      can_update_forum: await canUpdateForum(req.user, semester_name, module_code),
      can_delete_forum: await canDeleteForum(req.user, semester_name, module_code),
      can_request_course: await canRequestCourse(req.user, semester_name, module_code)
    };
    const course = await db.query(sql.courses.queries.find_course, [semester_name, module_code]).then(
      data => data.rows[0],
      err => {
        log.error(`Failed to get course ${module_code} offered in ${semester_name}`);
        throw err;
      }
    );
    const groups = await db.query(sql.groups.queries.get_groups_by_course, [semester_name, module_code]).then(
      data => data.rows,
      err => {
        log.error(`Failed to get groups of ${module_code} offered in ${semester_name}`);
        throw err;
      }
    );
    const forums = await db.query(sql.forums.queries.get_forums_by_course, [semester_name, module_code]).then(
      data => data.rows,
      err => {
        log.error(`Failed to get forums of ${module_code} offered in ${semester_name}`);
        throw err;
      }
    );
    res.render('course', { course, groups, forums, permissions });
  } catch (err) {
    next(err);
  }
};

exports.new = (req, res, next) => {
  db.query(sql.semesters.queries.get_semesters, (err1, semesters) => {
    if (err1) {
      log.error('Failed to get semesters');
      next(err1);
    } else {
      db.query(sql.modules.queries.get_modules, (err2, modules) => {
        if (err2) {
          log.error('Failed to get modules');
          next(err2);
        } else {
          res.render('courseNew', { semesters: semesters.rows, modules: modules.rows });
        }
      });
    }
  });
};

exports.create = (req, res) => {
  const { semester_name, module_code, title, description, credits } = req.body;

  db.query(sql.courses.queries.create_course, [semester_name, module_code, title, description, credits], err => {
    if (err) {
      log.error('Failed to create course');
      // TODO: refine error message
      req.flash('error', err.message);
      res.redirect(courseNewPath());
    } else {
      req.flash('success', `Course ${module_code} ${title} successfully created in ${semester_name}!`);
      res.redirect(coursesPath());
    }
  });
};

exports.delete = (req, res) => {
  const { semester_name, module_code } = req.params;
  db.query(sql.courses.queries.delete_course, [semester_name, module_code], err => {
    if (err) {
      log.error('Failed to delete course');
      req.flash('error', err.message);
    } else {
      req.flash('success', `Course ${module_code} successfully deleted from ${semester_name}!`);
    }
    res.redirect(coursesPath());
  });
};

exports.edit = (req, res, next) => {
  const { semester_name, module_code } = req.params;
  db.query(sql.courses.queries.find_course, [semester_name, module_code], (err, data) => {
    if (err) {
      log.error('Failed to find course');
      next(err);
    } else {
      const course = data.rows[0];
      db.query(sql.semesters.queries.get_semesters, (err1, semesters) => {
        if (err1) {
          log.error('Failed to get semesters');
          next(err1);
        } else {
          db.query(sql.modules.queries.get_modules, (err2, modules) => {
            if (err2) {
              log.error('Failed to get modules');
              next(err2);
            } else {
              res.render('courseEdit', {
                course,
                semesters: semesters.rows,
                modules: modules.rows
              });
            }
          });
        }
      });
    }
  });
};

exports.update = (req, res) => {
  const old_semester_name = req.params.semester_name;
  const old_module_code = req.params.module_code;
  const { semester_name, module_code, title, description, credits } = req.body;

  db.query(
    sql.courses.queries.update_course,
    [semester_name, module_code, title, description, credits, old_semester_name, old_module_code],
    err => {
      if (err) {
        log.error('Failed to update course');
        req.flash('error', err.message);
        res.redirect(courseEditPath(old_semester_name, old_module_code));
      } else {
        req.flash('success', `Course successfully updated!`);
        res.redirect(coursesPath());
      }
    }
  );
};
