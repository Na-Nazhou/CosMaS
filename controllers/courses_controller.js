const router = require('express').Router();
const db = require('../db');
const sql = require('../sql');

// Index
router.get('/', (req, res) => {
  db.query(sql.courses.queries.get_courses, (err, data) => {
    if (err) console.error('Cannot get courses');
    res.render('courses', { data: data.rows });
  });
});

// Create
router.get('/new', (req, res) => {
  res.render('courseNew');
});

router.post('/', (req, res) => {
  const { semester_name } = req.body;
  const { module_code } = req.body;
  const { title } = req.body;
  const { description } = req.body;
  const { credits } = req.body;

  db.query(sql.courses.queries.create_course, [semester_name, module_code, title, description, credits], err => {
    if (err) {
      console.error('Cannot create course');
      // TODO: refine error message
      req.flash('error', err.message);
      return res.redirect('/courses/new');
    }
    req.flash('info', 'course successfully created!');
    return res.redirect('/courses');
  });
});

// Delete
router.delete('/:semester_name*', (req, res) => { // TODO: syntax with module_code
  const semester_name = req.params.semester_name + req.params['0'];
  const module_code = req.params.module_code + req.params['1'];
  db.query(sql.courses.queries.delete_course, [semester_name, module_code], err => {
    if (err) {
      console.error('Cannot delete course');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/courses' });
  });
});

// Update
router.get('/:semester_name*/edit', (req, res) => {
  const semester_name = req.params.semester_name + req.params['0'];
  const module_code = req.params.module_code + req.params['1'];
  db.query(sql.courses.queries.find_course, [semester_name, module_code], (err, data) => {
    if (err) console.error('Cannot find course');
    const course = {
      semester_name: data.rows[0].semester_name,
      module_code: data.rows[0].module_code,
      title: data.rows[0].title,
      description: data.rows[0].description,
      credits: data.rows[0].credits
    };
    res.render('courseEdit', { course: data.rows[0] });
  });
});

router.put('/:course_code*', (req, res) => {
  const old_semester_name = req.params.semester_name + req.params['0'];
  const old_module_code = req.params.module_code + req.params['1'];

  const { semester_name } = req.body;
  const { module_code } = req.body;
  const { title } = req.body;
  const { description } = req.body;
  const { credits } = req.body;

  db.query(sql.courses.queries.update_course, [semester_name, module_code, title, description, credits], err => {
    if (err) {
      console.error('Cannot update course');
      return res.send({ error: err.message });
    }
    return res.send({ redirectUrl: '/courses' });
  });
});

course.exports = router;
