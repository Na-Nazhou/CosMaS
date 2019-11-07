const { Pool } = require('pg');
const log = require('../helpers/logging');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Returns a Promise and lets the call site decide what to do
function asyncQuery(text, params) {
  const start = Date.now();
  return pool
    .query(text, params)
    .then(data => {
      const duration = Date.now() - start;
      log.db_query('Executed query', { text, params, duration, rows: data.rowCount });
      return data;
    })
    .catch(err => {
      const duration = Date.now() - start;
      log.error('Error while executing async query', { text, params, duration, err });
      throw err;
    });
}

// Uses the callback given to process the output
function syncQuery(text, params, callback) {
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

function query(...args) {
  if (args.length === 1 || (args.length === 2 && typeof args[0] === 'string' && typeof args[1] !== 'function')) {
    // query (and params), no callback -> async
    return asyncQuery(args[0], args[1] ? args[1] : []);
  }
  if (typeof args[1] === 'function') {
    // query and callback, empty params
    return syncQuery(args[0], [], args[1]);
  }
  return syncQuery(...args);
}

module.exports = { query };
