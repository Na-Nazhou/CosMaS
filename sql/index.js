const sql = {}

sql.query = {
    /* USERS */
    find_user_by_id: 'SELECT * FROM users WHERE id=$1',
    get_users: 'SELECT * FROM users',
    create_user: 'INSERT INTO users (id, name, password_digest) VALUES ($1,$2,$3)', // normal user
    create_admin: 'INSERT INTO users (id, name, is_admin, password_digest) VALUES ($1,$2, true, $3)', // admin user
    update_user: 'UPDATE users SET id=$1,name=$2,password_digest=$3 WHERE id=$4',
    delete_user: 'DELETE FROM users WHERE id=$1',

    /* SEMESTERS */
    find_semester: 'SELECT * FROM semesters WHERE academic_year=$1 AND semester_number=$2',
    get_semesters: 'SELECT * FROM semesters',
    create_semester: 'INSERT INTO semesters (academic_year, semester_number, start_time, end_time) VALUES ($1,$2,$3,$4)', 
    update_semester: 'UPDATE semesters SET academic_year=$1,semester_number=$2,start_time=$3,end_time=$4 WHERE academic_year=$5 AND semester_number=$6',
    delete_semester: 'DELETE FROM semesters WHERE academic_year=$1 AND semester_number=$2',

    /* MODULES */
    get_modules: 'SELECT * FROM modules',
    create_module: 'INSERT INTO modules (module_code) VALUES ($1)',
    delete_module: 'DELETE FROM modules WHERE module_code=$1',
    
}

module.exports = sql
