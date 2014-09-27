'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();

var session = require(SOURCE_ROOT+'/modules/session/session');

describe('INTEGRATION TEST: src/modules/session/session', function() {
  describe('#createSession', function() {
    it('Simple test should success.', function(done) {
      session.createSession('namhoon', function(err, result){
        done();
      });
    });
    it('Invalid arguments throws error', function() {
      (function(){session.createSession();}).should.throw(Error);
      (function(){session.createSession('only username');}).should.throw(Error);
      (function(){session.createSession(function invalidFunc(){});}).should.throw(Error);
    });
  });

  describe('#getUsername', function() {
    it('Get username should success after create session', function(done) {
      var username = '+821012345678';
      session.createSession(username, function(err, result) {
        if (err) throw new Error();
        session.getUsername(result, function(err, result) {
          if (err) throw new Error();
          (result).should.equal(username);
          done();
        });
      });
    });
  });
});