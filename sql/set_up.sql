DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Semesters CASCADE;
DROP TABLE IF EXISTS Modules CASCADE;
DROP TABLE IF EXISTS Courses CASCADE;
DROP TABLE IF EXISTS Course_Requests CASCADE;
DROP TYPE IF EXISTS COURSE_ROLE CASCADE;
DROP TABLE IF EXISTS Course_Memberships CASCADE;
DROP TABLE IF EXISTS Groups CASCADE;
DROP TYPE IF EXISTS GROUP_ROLE CASCADE;
DROP TABLE IF EXISTS Group_Memberships CASCADE;
DROP TABLE IF EXISTS Forums CASCADE;
DROP TABLE IF EXISTS Accesses CASCADE;
DROP TABLE IF EXISTS Threads CASCADE;
DROP TABLE IF EXISTS Replies CASCADE;

CREATE TABLE Users (
    id              CHAR(9) PRIMARY KEY,
    name            VARCHAR(255) NOT NULL,
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    password_digest VARCHAR(255) NOT NULL
);

CREATE TABLE Semesters (
    academic_year   INTEGER,
    semester_number INTEGER,
    start_time      TIMESTAMP NOT NULL,
    end_time        TIMESTAMP NOT NULL,
    CHECK(end_time > start_time),
    PRIMARY KEY(academic_year, semester_number)
);

CREATE TABLE Modules (
    module_code VARCHAR(10) PRIMARY KEY
);

CREATE TABLE Courses (
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10) REFERENCES Modules(module_code),
    title           VARCHAR(100) NOT NULL,
    description     TEXT NOT NULL,
    credits         INTEGER NOT NULL,
    FOREIGN KEY(academic_year, semester_number) REFERENCES Semesters(academic_year, semester_number),
    PRIMARY KEY(academic_year, semester_number, module_code)
);

CREATE TABLE Course_Requests (
    is_approved     BOOLEAN NOT NULL DEFAULT FALSE,
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10),
    user_id         CHAR(9) REFERENCES Users(id) NOT NULL,
    FOREIGN KEY(academic_year, semester_number, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, user_id)
);

CREATE TYPE COURSE_ROLE AS ENUM ('student', 'TA', 'professor');
CREATE TABLE Course_Memberships (
    role            COURSE_ROLE NOT NULL DEFAULT 'student',
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10),
    user_id         CHAR(9) REFERENCES Users(id) NOT NULL,
    FOREIGN KEY(academic_year, semester_number, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, user_id)
);

CREATE TABLE Groups (
    name            VARCHAR(100),
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10),
    FOREIGN KEY(academic_year, semester_number, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, name)
);

CREATE TYPE GROUP_ROLE AS ENUM ('student', 'TA'); 
CREATE TABLE Group_Memberships (
    role            GROUP_ROLE NOT NULL DEFAULT 'student',
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10),
    group_name      VARCHAR(100),
    user_id         CHAR(9) REFERENCES Users(id) NOT NULL,  
    FOREIGN KEY(academic_year, semester_number, module_code, group_name) REFERENCES Groups ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, group_name, user_id)
); 

CREATE TABLE Forums (
    title           VARCHAR(255),
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10),
    FOREIGN KEY(academic_year, semester_number, module_code) REFERENCES Courses ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, title)
);

CREATE TABLE Accesses (
    academic_year     INTEGER,
    semester_number   INTEGER,
    module_code       VARCHAR(10),
    group_name        VARCHAR(100),
    forum_title       VARCHAR(255),
    FOREIGN KEY(academic_year, semester_number, module_code, group_name) REFERENCES Groups ON DELETE CASCADE,
    FOREIGN KEY(academic_year, semester_number, module_code, forum_title) REFERENCES Forums ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, group_name, forum_title)
);

CREATE TABLE Threads (
    created_at      TIMESTAMP,
    title           VARCHAR(255) NOT NULL,
    content         TEXT NOT NULL,
    author_id       CHAR(9) NOT NULL REFERENCES Users(id) ON DELETE SET NULL,
    academic_year   INTEGER,
    semester_number INTEGER,
    module_code     VARCHAR(10),
    forum_title     VARCHAR(255),
    FOREIGN KEY(academic_year, semester_number, module_code, forum_title) REFERENCES Forums ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, forum_title, created_at)
);

CREATE TABLE Replies (
    created_at        TIMESTAMP,
    content           TEXT NOT NULL,
    author_id         CHAR(9) NOT NULL REFERENCES Users(id) ON DELETE SET NULL,
    academic_year     INTEGER,
    semester_number   INTEGER,
    module_code       VARCHAR(10),
    forum_title       VARCHAR(255),
    thread_created_at TIMESTAMP,
    FOREIGN KEY(academic_year, semester_number, module_code, forum_title, thread_created_at) REFERENCES Threads ON DELETE CASCADE,
    PRIMARY KEY(academic_year, semester_number, module_code, forum_title, thread_created_at, created_at)
);
