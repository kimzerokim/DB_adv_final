'use strict';

/**
 * @class UserError
 * @constructor
 */
exports.UserError = function(message) {
  this.name = 'UserError';
  this.message = (message || '');
};
exports.UserError.prototype = new Error();

/**
 * @class UserNotExistsError
 * @constructor
 */
exports.UserNotExistsError = function(message) {
  this.name = 'UserNotExistsError';
  this.message = (message || '');
};
exports.UserNotExistsError.prototype = new Error();


module.exports = exports;