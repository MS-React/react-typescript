import * as Logger from 'js-logger';

Logger.useDefaults();

// Istanbul ignore next 
if (process.env.NODE_ENV === 'production') {
  Logger.setLevel(Logger.OFF);
}

// Log unhandled errors
window.onerror = logErrors;

export function logErrors(message: any, file: any, line = 'N/A' as any, col = 'N/A' as any) {
  Logger.error(`An Error Occurred!!: message[${message}], file[${file}], line[${line}], col[${col}]`);
  return false;
}
