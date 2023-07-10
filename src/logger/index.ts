import winston, { Logform, Logger } from 'winston';

const colorizer: Logform.Colorizer = winston.format.colorize();

const logger: Logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YY-MM-DD HH:mm:ss'
    }),
    winston.format.simple(),
    winston.format.printf((msg) =>
      colorizer.colorize(msg.level, `[${msg.timestamp}][${msg.level.toUpperCase()}]: ${msg.message}`)
    )
  ),
  transports: [new winston.transports.Console()]
});

export default logger;
