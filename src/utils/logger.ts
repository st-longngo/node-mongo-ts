import { createLogger, format, transports } from 'winston';
import { config } from '../configs';

// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const formatParams = (info: any) => {
  const { timestamp, message, ...args } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');

  return `${ts}: ${message} ${Object.keys(args).length ? JSON.stringify(args, undefined, '') : ''}`;
};

const Format = format.combine(format.colorize(), format.timestamp(), format.align(), format.printf(formatParams));

const transportArray =
  config.env !== 'production'
    ? [new transports.File({ filename: 'error.log', level: 'error' })]
    : [new transports.Console()];

export const logger = createLogger({
  level: config.logLevel,
  format: Format,
  transports: transportArray,
});
