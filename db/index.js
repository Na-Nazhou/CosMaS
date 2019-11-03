const { Pool } = require('pg');
const log = require('../helpers/logging');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

function queryAndLog(text, params, callback) {
  // Handle situation when no params are passed in
  if (typeof params === 'function') {
    callback = params;
    params = [];
  }
  const start = Date.now();
  return pool.query(text, params, (err, res) => {
    const duration = Date.now() - start;
    if (err) {
      log.error('Error while executing query', { text, params, duration, err });
    } else {
      log.db_query('Executed query', { text, params, duration, rows: res.rowCount });
    }
    callback(err, res);
  });
}

module.exports = {
  query: queryAndLog
};
