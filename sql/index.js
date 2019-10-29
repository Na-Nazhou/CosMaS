const sql = {}

sql.query = {
    /* USERS */
    find_user_by_id: 'SELECT * FROM users WHERE id=$1',
    get_users: 'SELECT * FROM users',
    create_user: 'INSERT INTO users (id, name, password_digest) VALUES ($1,$2,$3)',
    update_user: 'UPDATE users SET id=$1,name=$2,password_digest=$3 WHERE id=$4',
    delete_user: 'DELETE FROM users WHERE id=$1',
}

module.exports = sql
