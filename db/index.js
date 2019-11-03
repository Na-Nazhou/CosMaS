const { Pool } = require('pg');
const chalk = require('chalk');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

function queryAndLog(text, params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = [];
  }
  const start = Date.now();
  return pool.query(text, params, (err, res) => {
    const duration = Date.now() - start;
    if (err) {
      console.error(chalk.red('Error while executing query'), { text, params, duration, err });
    } else {
      console.log(chalk.cyan('Executed query'), { text, params, duration, rows: res.rowCount });
    }
    callback(err, res);
  });
}

module.exports = {
  query: queryAndLog
};
