const sql = {}

sql.query = {
    // Insertion
    add_user: 'INSERT INTO users (id, name, password_digest) VALUES ($1,$2,$3)',

    // Login
    login: 'SELECT * FROM users WHERE id=$1',

    // Information
    users: 'SELECT * FROM users',
}

module.exports = sql
