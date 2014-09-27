'use strict';
var should = require(PROJECT_ROOT+'node_modules/chai/chai.js').should();
var session = require(SOURCE_ROOT+'/routes/accounts');
var user = require(SOURCE_ROOT+'/modules/user/user');

var request = require('request');
var jar = request.jar();
request.defaults({jar: jar});

var gc = require(TEST_ROOT+'/util/redisgc');

describe('INTEGRATION TEST: src/routes/accounts', function() {
  describe('POST /accounts/register', function() {
    var options = {
      url: 'http://localhost:8300/accounts/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var testUsername = '+821032080403';
    var testPassword = 'abcd1234';

    it('No username, password should return 400', function(done) {
      options['body'] = JSON.stringify({
        username: testUsername,
        password: testPassword
      });
      request(options, function (err, res, body) {
        if (err) throw err;
        res.statusCode.should.be.equal(200);
        gc.deleteKey(testUsername, function (err, result) {
          done();
        });
      });
    });
    it('No username, password should return 400', function(done) {
      options.headers = {};
      request(options, function(err, res, body) {
        res.statusCode.should.be.equal(400);
        done();
      }).end();
    });
    it('No password should return 400', function(done) {
      options['body'] = JSON.stringify({
        username: testUsername
      });
      request(options, function(err, res, body) {
        res.statusCode.should.be.equal(400);
        done();
      });
    });
    it('No username should return 400', function(done) {
      options['body'] = JSON.stringify({
        password: testPassword
      });
      request(options, function(err, res, body) {
        res.statusCode.should.be.equal(400);
        done();
      });
    });
  });

  describe('POST /accounts/login', function() {
    var options = {
      url: 'http://localhost:8300/accounts/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      jar: jar
    };

    var testUsername = '+821032080403';
    var testPassword = 'abcd1234';

    it('Simple test should success.', function (done) {
      user.createUser(testUsername, testPassword, function (err, result) {
        if (err) throw err;
        options['body'] = JSON.stringify({
          username: testUsername,
          password: testPassword
        });
        request(options, function (err, res, body) {
          should.exist(jar.getCookies(options.url)[0]);
          res.statusCode.should.be.equal(200);
          done();
        });
      });
    });

    it('Invalid password should fail', function (done) {
      user.createUser(testUsername, testPassword, function (err, result) {
        if (err) throw err;
        options['body'] = JSON.stringify({
          username: testUsername,
          password: 'invalid_password'
        });
        request(options, function (err, res, body) {
          res.statusCode.should.be.equal(200);
          done();
        });
      });
    });

    afterEach(function(done) {
      gc.deleteKey(testUsername, function (err, result) {
        done();
      });
    })
  });
});