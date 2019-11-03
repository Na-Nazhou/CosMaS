DELETE FROM course_memberships;
DELETE FROM courses;
DELETE FROM modules;
DELETE FROM semesters;
DELETE FROM users;

INSERT INTO users VALUES ('A9999999A', 'Admin', 'True', '$2b$10$T24mdVF8M8ie28Rkj8hHkuoftnRbVNLZMvPMkJ7TaOpbfsQC2EvMW');
INSERT INTO users VALUES ('A0000000A', 'Student1', 'False', '$2b$10$T24mdVF8M8ie28Rkj8hHkuoftnRbVNLZMvPMkJ7TaOpbfsQC2EvMW');
INSERT INTO users VALUES ('A0000001A', 'Student2', 'False', '$2b$10$T24mdVF8M8ie28Rkj8hHkuoftnRbVNLZMvPMkJ7TaOpbfsQC2EvMW');
INSERT INTO users VALUES ('A0000010A', 'Professor1', 'False', '$2b$10$T24mdVF8M8ie28Rkj8hHkuoftnRbVNLZMvPMkJ7TaOpbfsQC2EvMW');

INSERT INTO semesters VALUES ('AY19/20 semester 1', TIMESTAMP '2019-08-01 00:00:00', TIMESTAMP '2019-12-01 00:00:00');
INSERT INTO semesters VALUES ('AY19/20 semester 2', TIMESTAMP '2020-01-01 00:00:00', TIMESTAMP '2020-05-01 00:00:00');

INSERT INTO modules VALUES ('CS2030');
INSERT INTO modules VALUES ('CS2040');
INSERT INTO modules VALUES ('CS2102');
INSERT INTO modules VALUES ('CS2103');

INSERT INTO courses VALUES ('AY19/20 semester 1', 'CS2030', 'Programming Methodology II', 'OOP, FP', 4 );
INSERT INTO courses VALUES ('AY19/20 semester 2', 'CS2030', 'Programming Methodology II', 'OOP, FP', 4 );
INSERT INTO courses VALUES ('AY19/20 semester 1', 'CS2040', 'Data Structure and Algorithms', 'TST TST', 4 );
INSERT INTO courses VALUES ('AY19/20 semester 1', 'CS2102', 'Database Systems', 'write sql', 4 );
INSERT INTO courses VALUES ('AY19/20 semester 1', 'CS2103', 'Software Engineering', 'draw uml', 4 );

INSERT INTO course_memberships VALUES ('professor', 'AY19/20 semester 1', 'CS2030', 'A0000010A');
INSERT INTO course_memberships VALUES ('professor', 'AY19/20 semester 1', 'CS2040', 'A0000010A');
INSERT INTO course_memberships VALUES ('professor', 'AY19/20 semester 1', 'CS2102', 'A0000010A');
INSERT INTO course_memberships VALUES ('professor', 'AY19/20 semester 1', 'CS2103', 'A0000010A');
INSERT INTO course_memberships VALUES ('student', 'AY19/20 semester 1', 'CS2030', 'A0000000A');
INSERT INTO course_memberships VALUES ('student', 'AY19/20 semester 1', 'CS2040', 'A0000000A');
INSERT INTO course_memberships VALUES ('student', 'AY19/20 semester 1', 'CS2102', 'A0000001A');
INSERT INTO course_memberships VALUES ('student', 'AY19/20 semester 1', 'CS2103', 'A0000001A');
INSERT INTO course_memberships VALUES ('TA', 'AY19/20 semester 1', 'CS2030', 'A0000001A');
