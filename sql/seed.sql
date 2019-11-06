/* USERS */
INSERT INTO users VALUES ('A9999999A', 'Admin', 'True', '$2b$10$T24mdVF8M8ie28Rkj8hHkuoftnRbVNLZMvPMkJ7TaOpbfsQC2EvMW');
INSERT INTO users (id, name, password_digest) VALUES ('A0130001B', 'Chloe Tan', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0140002C', 'Timothy Phua', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0150003D', 'Dana Zhang', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0160004E', 'Megan Tan', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0160005F', 'Reuben Lam', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0170006G', 'Michelle Yeoh', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0180007H', 'Albert Ang', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0190008I', 'Rebecca Chua', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0200009J', 'Ashley Chee', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');
INSERT INTO users (id, name, password_digest) VALUES ('A0200000K', 'Patrick Leow', '$2b$10$xpXE/.ugaLhigMWJBjmXFOLId8l7YpVSC0DaV69MS//BuDhXbEwlq');

/* SEMESTERS */
INSERT INTO semesters VALUES ('AY18/19S1', '2018-08-13 00:00:00', '2018-12-09 00:00:00');
INSERT INTO semesters VALUES ('AY18/19S2', '2019-01-14 00:00:00', '2019-05-11 00:00:00');
INSERT INTO semesters VALUES ('AY19/20S1', '2019-08-05 00:00:00', '2019-12-07 00:00:00');
INSERT INTO semesters VALUES ('AY19/20S2', '2020-01-13 00:00:00', '2020-05-09 00:00:00');

/* MODULES */
INSERT INTO modules VALUES ('CS2102');
INSERT INTO modules VALUES ('CS1101S');
INSERT INTO modules VALUES ('CS2103');
INSERT INTO modules VALUES ('GEQ1000');

/* COURSES */
INSERT INTO courses VALUES ('AY18/19S1', 'CS2102', 'Database Systems', 'The aim of this module is to introduce the fundamental concepts and techniques necessary for the understanding and practice of design and implementation of database applications and of the management of data with relational database management systems. The module covers practical and theoretical aspects of design with entity-relationship model, theory of functional dependencies and normalisation by decomposition in second, third and Boyce-Codd normal forms. The module covers practical and theoretical aspects of programming with SQL data definition and manipulation sublanguages, relational tuple calculus, relational domain calculus and relational algebra.', 4);
INSERT INTO courses VALUES ('AY18/19S2', 'CS2102', 'Database Systems', 'The aim of this module is to introduce the fundamental concepts and techniques necessary for the understanding and practice of design and implementation of database applications and of the management of data with relational database management systems. The module covers practical and theoretical aspects of design with entity-relationship model, theory of functional dependencies and normalisation by decomposition in second, third and Boyce-Codd normal forms. The module covers practical and theoretical aspects of programming with SQL data definition and manipulation sublanguages, relational tuple calculus, relational domain calculus and relational algebra.', 6);
INSERT INTO courses VALUES ('AY18/19S1', 'CS1101S', 'Programming Methodology', 'This module introduces the concepts of programming and computational problem solving, and is the first and foremost introductory module to computing. Starting from a small core of fundamental abstractions, the module introduces programming as a method for communicating computational processes. The module begins with purely functional programming based on a simple substitution-based execution model, and ends with a powerful modern imperative language based on a realistic environment-based execution model. Topics covered include: functional abstraction, recursion, higher-order functions, data abstraction, algorithmic strategies, state mutation, loops and arrays, evaluation strategies, sorting and searching, debugging and testing.', 5);
INSERT INTO courses VALUES ('AY18/19S2', 'CS1101S', 'Programming Methodology (Revamped)', 'This module introduces the concepts of programming and computational problem solving, and is the first and foremost introductory module to computing. Starting from a small core of fundamental abstractions, the module introduces programming as a method for communicating computational processes. The module begins with purely functional programming based on a simple substitution-based execution model, and ends with a powerful modern imperative language based on a realistic environment-based execution model. Topics covered include: functional abstraction, recursion, higher-order functions, data abstraction, algorithmic strategies, state mutation, loops and arrays, evaluation strategies, sorting and searching, debugging and testing.', 4);
INSERT INTO courses VALUES ('AY18/19S1', 'CS2103', 'Software Engineering', 'This module introduces the necessary conceptual and analytical tools for systematic and rigorous development of software systems. It covers four main areas of software development, namely object-oriented system analysis, object-oriented system modelling and design, implementation, and testing, with emphasis on system modelling and design and implementation of software modules that work cooperatively to fulfill the requirements of the system. Tools and techniques for software development, such as Unified Modelling Language (UML), program specification, and testing methods, will be taught. Major software engineering issues such as modularisation criteria, program correctness, and software quality will also be covered.', 4);

/* COURSE_REQUESTS */

/* COURSE_MEMBERSHIPS */

/* GROUPS */

/* GROUP_MEMBERSHIPS */

/* FORUMS */

/* ACCESSES */

/* REPLIES */