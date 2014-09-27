'use strict';
var connection = require(SOURCE_ROOT+'/modules/redisconnection/redisconnection').getConnection();

var RedisGC = {};

RedisGC.deleteKey = function(key, callback) {
  connection.multi([
    ['del', key],
    ['del', 'user:'+key],
    ['del', 'session:'+key]
  ]).exec(function (err, replies) {
    if (err) console.log(err.message);
    callback(null);
  });
};


module.exports = RedisGC;