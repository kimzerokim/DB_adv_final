'use strict';
/**
 * @class RedisConnectionError
 * @constructor
 */
exports.RedisConnectionError = function(message) {
  this.name = 'RedisConnectionError';
  this.message = (message || '');
};
exports.RedisConnectionError.prototype = new Error();
