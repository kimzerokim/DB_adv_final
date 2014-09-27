pine-auth-server
================

Welcome to pine authentication server



How to install project
======================

Run tests
---------
  1. Start redis server
    
    $ redis-server /usr/local/etc/redis.conf
    
  2. Start express server
  
    $ node bin/www 
  
  3. Run mocha test
    
    $ mocha --reporter nyan --require bin/global $(find ./test -name '*test.js') 


How to run project
======================

  0. Prerequisites
  
     * node v0.10.31
     * redis v2.8
     * install npm dependency modules 

  1. Set settings environment

    $ export AUTH_SERVER_SETTINGS=local (or development or production)
    
    $ export DEBUG=info:*,warn:*,error:* \# DEBUG=* or DEBUG=error:*
    
  2. Run server
  
    $ node bin/www
    
  Or, just typing below:
  
    $ AUTH_SERVER_SETTINGS=local DEBUG=info:*,warn:*,error:*,-express:* && node bin/www
    
    or (on development server)
    
    $ AUTH_SERVER_SETTINGS=development DEBUG=info:*,warn:*,error:*,-express:* && node bin/www
    
  logging with stdout (write to file) you can see Date#toUTCString with logging
  
    $ AUTH_SERVER_SETTINGS=local DEBUG=info:*,warn:*,error:*,-express:* node bin/www > run.log   # (optional) & tail -f run.log


Project documentation
======================

  * Install yuidocjs
  
    $ npm install -g yuidocjs
    
  * Run yuidoc
  
    $ yuidoc .

  * View out/index.html page


## Quick Examples

```javascript
Register user api

Content-type: application/json
{
    "username": "+821012345678",
    "password": "password_here"
}

Password must have one of english and one of number character.
8 <= password <= 24.
```

```javascript
Login user api

Content-type: application/json
{
    "username": "+821012345678",
    "password": "password_here"
}

If log in succeed, cookie will be returned.
Expire date is UTC String.

ex) Cookie: sessionid="aaaaaaaaaaaaaaa"; expires=Fri, 08 Aug 2014 12:10:42 GMT"
```