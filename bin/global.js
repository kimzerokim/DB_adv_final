var path = require('path');
var debug = require('debug');
var env = process.env.AUTH_SERVER_SETTINGS || 'local';

GLOBAL = {};

PROJECT_ROOT = path.join(path.dirname(__filename), '../');
SOURCE_ROOT = path.join(PROJECT_ROOT, 'src');
TEST_ROOT = path.join(PROJECT_ROOT, 'test');

(function() {

  // log level is info, warn, error.

  var base = {
    port: 8300,
    db: {
      host: 'localhost',
      port: 6379
    }
  };

  var local = {
    port: 8300,
    db: {
      host: 'localhost',
      port: 6379
    }
  };

  var development = {
    port: 8300,
    db: {
      host: 'localhost',
      port: 6379
    }
  };

  var production = {
  };

  // parse config
  switch (env) {
    case 'local':       GLOBAL = overwriteSettings(base, local); break;
    case 'development': GLOBAL = overwriteSettings(base, development); break;
    case 'production':  throw new Error('production settings not set.');
    default:            throw new Error('SETTINGS environment can be one of \'local\', \'development\', \'production\'.');
  }

  // set debugger
  var info = debug('info:');
  info.log = console.log.bind(console);
  var warn = debug('warn:');
  warn.log = console.warn.bind(console);
  var error = debug('error:');
  error.log = console.error.bind(console);

  function overwriteSettings(baseSettings, specificSettings) {
    Object.keys(specificSettings).forEach(function(key) {
      if (isObjectAndNotArray(baseSettings[key]) && isObjectAndNotArray(specificSettings[key]))
        overwriteSettings(baseSettings[key], specificSettings[key]);
      else
        baseSettings[key] = specificSettings[key];
    });
    return baseSettings;
  }

  function isObjectAndNotArray(object) {
    return (typeof object === 'object' && !Array.isArray(object));
  }

  module.exports = exports = GLOBAL;
})();