'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var redisconnection = require(SOURCE_ROOT+'/modules/redisconnection/redisconnection');

describe('INTEGRATION TEST: src/modules/redisconnection/redisconnection', function() {
  describe('#getConnection', function() {
    it('Redis connection should not null', function() {
      should.exist(redisconnection.getConnection());
    });
  });
});