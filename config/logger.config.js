const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require('winston-daily-rotate-file');

const myFormat = printf(({ level, message, label ,timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});



const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: "auth" }),
    timestamp(),
    myFormat,
    format.json()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
     level: 'error',
     datePattern: 'YYYY-MM-DD',
     maxSize: `20m`,
     maxFiles: `14d`,
     zippedArchive: true}),
     new transports.DailyRotateFile({
    filename: 'logs/access-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: `20m`,
    maxFiles: `14d`,
    zippedArchive: true}),
  ]
});

module.exports=logger