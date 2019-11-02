const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      if (err) {
        console.error('Error while executing query', { text, duration, err });
      } else {
        console.log('Executed query', { text, duration, rows: res.rowCount });
      }
      callback(err, res);
    });
  }
};
