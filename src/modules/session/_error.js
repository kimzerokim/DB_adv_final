'use strict';

/**
 * @class SessionError
 * @constructor
 */
exports.SessionError = function(message) {
  this.name = 'SessionError';
  this.message = (message || '');
};
exports.SessionError.prototype = new Error();


module.exports = exports;