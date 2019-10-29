const sql = {}

sql.query = {
    /* LOGIN */
    login: 'SELECT * FROM users WHERE id=$1',

    /* USERS */
    get_users: 'SELECT * FROM users',
    create_user: 'INSERT INTO users (id, name, password_digest) VALUES ($1,$2,$3)',
    delete_user: 'DELETE FROM users WHERE id=$1',
}

module.exports = sql
