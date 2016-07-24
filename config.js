var log4js = require('log4js');

/**
 * [mongodb config]
 * @type {Object}
 */
exports.mongodb = {
  cookieSecret: 'hiblog',
  db: 'blog',
  host: 'localhost',
  port: 27017
};

exports.getLogger = function(fileName) {

  //console log is loaded by default, so you won't normally need to do this
  //log4js.loadAppender('console');
  log4js.loadAppender('file');
  //log4js.addAppender(log4js.appenders.console());
  log4js.addAppender(log4js.appenders.file('../logs/' + fileName + '.log'), log4js.layouts.basicLayout, 2048000, 3, true);

  // var logger = log4js.getLogger(fileName);
  return log4js.getLogger(fileName);
}