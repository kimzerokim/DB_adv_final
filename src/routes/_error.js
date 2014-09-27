'use strict';

/**
 * @class AccountError
 * @constructor
 */
exports.AccountError = function(message) {
  this.name = 'AccountError';
  this.message = (message || '');
};
exports.AccountError.prototype = new Error();

/**
 * @class UserExistsError
 * @constructor
 */
exports.UserExistsError = function(message) {
  this.name = 'AccountError';
  this.message = (message || '');
};
exports.UserExistsError.prototype = new Error();


module.exports = exports;