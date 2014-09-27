'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();
var user = require(SOURCE_ROOT+'/modules/user/user');

var gc = require(TEST_ROOT+'/util/redisgc');

describe('INTEGRATION TEST: src/modules/user/user', function() {
  var testUsername = '+821012345678';
  var testPassword = 'abcd1234';

  describe('#createUser', function() {
    it('Simple test should success.', function(done) {
      user.createUser(testUsername, testPassword, function(err, result){
        if (err) throw err;
        done();
      });
    });

    it('Error returned already user exists', function(done) {
      user.createUser(testUsername, testPassword, function(err, result) {
        user.createUser(testUsername, testPassword, function(err, result) {
          should.exist(err);
          done();
        });
      });
    });
  });

  describe('#exists', function() {
    it('Check if exists, after create user', function(done) {
      user.exists(testUsername, function(err, result) {
        if (err) throw err;
        result.should.be.false;
        user.createUser(testUsername, testPassword, function(err, result) {
          if (err) throw err;
          user.exists(testUsername, function(err, result) {
            result.should.be.true;
            done();
          });
        });
      });
    });
  });

  describe('#checkPassword', function() {
    it('Simple test should success', function(done) {
      user.createUser(testUsername, testPassword, function(err, result) {
        if (err) throw err;
        user.checkPassword(testUsername, testPassword, function(err, result) {
          if (err) throw err;
          result.should.true
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    gc.deleteKey(testUsername, function(err, result) {
      done();
    });
  });
});