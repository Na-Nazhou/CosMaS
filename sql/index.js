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
    find_semester: 'SELECT * FROM semesters WHERE name=$1',
    get_semesters: 'SELECT * FROM semesters',
    create_semester: 'INSERT INTO semesters (name, start_time, end_time) VALUES ($1,$2,$3)', 
    update_semester: 'UPDATE semesters SET name=$1,start_time=$2,end_time=$3 WHERE name=$4',
    delete_semester: 'DELETE FROM semesters WHERE name=$1',

    /* MODULES */
    get_modules: 'SELECT * FROM modules',
    create_module: 'INSERT INTO modules (module_code) VALUES ($1)',
    delete_module: 'DELETE FROM modules WHERE module_code=$1',
}

module.exports = sql
