DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Semesters;
DROP TABLE IF EXISTS Modules;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Course_Requests;
DROP TYPE IF EXISTS COURSE_ROLE;
DROP TABLE IF EXISTS Course_Memberships;
DROP TABLE IF EXISTS Groups;
DROP TYPE IF EXISTS GROUP_ROLE;
DROP TABLE IF EXISTS Group_Memberships;
DROP TABLE IF EXISTS Forums;
DROP TABLE IF EXISTS Accesses;
DROP TABLE IF EXISTS Threads;
DROP TABLE IF EXISTS Replies;

CREATE TABLE Users (
    id              CHAR(9) PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    password_digest VARCHAR(255) NOT NULL
);

CREATE TABLE Semesters (
    name            VARCHAR(50) PRIMARY KEY,
    start_time      TIMESTAMP NOT NULL,
    end_time        TIMESTAMP NOT NULL,
    CHECK(end_time > start_time)
);

CREATE TABLE Modules (
    module_code VARCHAR(10) PRIMARY KEY
);

CREATE TABLE Courses (
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10) REFERENCES Modules(module_code),
    title           VARCHAR(100) NOT NULL,
    description     TEXT NOT NULL,
    credits         INTEGER NOT NULL,
    FOREIGN KEY(semester_name) REFERENCES Semesters(name),
    PRIMARY KEY(semester_name, module_code)
);

CREATE TABLE Course_Requests (
    is_approved     BOOLEAN NOT NULL DEFAULT FALSE,
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10),
    user_id         CHAR(9) REFERENCES Users(id) NOT NULL,
    FOREIGN KEY(semester_name, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, user_id)
);

CREATE TYPE COURSE_ROLE AS ENUM ('student', 'TA', 'professor');
CREATE TABLE Course_Memberships (
    role            COURSE_ROLE NOT NULL DEFAULT 'student',
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10),
    user_id         CHAR(9) REFERENCES Users(id) NOT NULL,
    FOREIGN KEY(semester_name, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, user_id)
);

CREATE TABLE Groups (
    name            VARCHAR(100),
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10),
    FOREIGN KEY(semester_name, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, name)
);

CREATE TYPE GROUP_ROLE AS ENUM ('student', 'TA'); 
CREATE TABLE Group_Memberships (
    role            GROUP_ROLE NOT NULL DEFAULT 'student',
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10),
    group_name      VARCHAR(100),
    user_id         CHAR(9) REFERENCES Users(id) NOT NULL,  
    FOREIGN KEY(semester_name, module_code, group_name) REFERENCES Groups ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, group_name, user_id)
); 

CREATE TABLE Forums (
    title           VARCHAR(255),
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10),
    FOREIGN KEY(semester_name, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, title)
);

CREATE TABLE Accesses (
    semester_name     VARCHAR(50),
    module_code       VARCHAR(10),
    group_name        VARCHAR(100),
    forum_title       VARCHAR(255),
    FOREIGN KEY(semester_name, module_code, group_name) REFERENCES Groups ON DELETE CASCADE,
    FOREIGN KEY(semester_name, module_code, forum_title) REFERENCES Forums ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, group_name, forum_title)
);

CREATE TABLE Threads (
    created_at      TIMESTAMP,
    title           VARCHAR(255) NOT NULL,
    content         TEXT NOT NULL,
    author_id       CHAR(9) NOT NULL REFERENCES Users(id) ON DELETE SET NULL,
    semester_name   VARCHAR(50),
    module_code     VARCHAR(10),
    forum_title     VARCHAR(255),
    FOREIGN KEY(semester_name, module_code, forum_title) REFERENCES Forums ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, forum_title, created_at)
);

CREATE TABLE Replies (
    created_at        TIMESTAMP,
    content           TEXT NOT NULL,
    author_id         CHAR(9) NOT NULL REFERENCES Users(id) ON DELETE SET NULL,
    semester_name     VARCHAR(50),
    module_code       VARCHAR(10),
    forum_title       VARCHAR(255),
    thread_created_at TIMESTAMP,
    FOREIGN KEY(semester_name, module_code, forum_title, thread_created_at) REFERENCES Threads ON DELETE CASCADE,
    PRIMARY KEY(semester_name, module_code, forum_title, thread_created_at, created_at)
);
