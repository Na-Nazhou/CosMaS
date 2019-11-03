const chalk = require('chalk');

const log = {};

// Generic loggers
log.info = (msg, ...rest) => console.log(msg, ...rest);
log.error = (msg, ...rest) => console.error(chalk.red(msg), ...rest);
log.fatal = (msg, ...rest) => console.error(chalk.red.bold(msg), ...rest);

// Domain-specific loggers
log.route = (msg, ...rest) => console.log(chalk.blue.bold(msg), ...rest);
log.controller = (msg, ...rest) => console.log(chalk.blue(msg), ...rest);
log.db_query = (msg, ...rest) => console.log(chalk.cyan(msg), ...rest);

module.exports = log;
