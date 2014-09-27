'use strict';
var redis = require('redis');
var error = require('./_error');
var info = require('debug')('info:redisconnection');
var warn = require('debug')('warn:redisconnection');

var redisconnection = {};

var client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
var connected = true;
var errorCount = 0;

client.on('error', function (err) {
  connected = false;
  warn('Redis connection ' + errorCount++ + ' error: ' + err);
  warn('Trying to reconnect...');
  setTimeout(function () {
    if (errorCount > 10) throw new error.RedisConnectionError('Error: Can not connect redis.');
    client = redis.createClient(GLOBAL.db.port, GLOBAL.db.host);
  }, 1000);
});
client.on('connect', function () {
  info('Redis connected: ' + new Date());
  connected = true;
});

redisconnection.getConnection = function() {
  return client;
};

module.exports = redisconnection;