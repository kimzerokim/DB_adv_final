/**
 * Created by youngkim on 2014. 9. 27..
 */

//modules
var Step = require('step');

// config file
var mysqlConfig = {
    host: 'localhost',
    port: 3306,
    user: 'recover39',
    password: 'recover',
    database: 'user'
};

// mysql client connect
var mysql = require('mysql');
var mysqlConnection = mysql.createConnection(mysqlConfig);

(function handleDisconnect() {
    mysqlConnection.on('error', function (err) {
        if (!err.fatal) {
            return;
        }

        if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
            throw err;
        }

        mysqlConnection = mysql.createConnection(mysqlConnection.config);
        handleDisconnect();
        mysqlConnection.connect();
    });
})();

var client = require(SOURCE_ROOT + '/modules/redisconnection/redisconnection').getConnection();

var timeOut = 10;

function dumpMysql() {
    Step(
        function getUserList() {
            client.multi()
                .keys('user:')
                .exec(this);
        },

        function insertToMysql(err, replies) {
            if (err)
                throw err;
            replies.forEach(function (key) {
                client.hgetall(key, function (err, result) {
                    if (err)
                        throw err;
                    var userInfo = {
                        userName: result[1],
                        password: result[3]
                    };
                    mysqlConnection.query('INSERT INTO user SET ?', userInfo, function(err) {
                        if (err)
                            throw err;
                    })
                });
            });
        },

        function restart(err, r) {
            setTimeout(dumpMysql, timeOut * 1000);
        }
    );

}
setTimeout(dumpMysql, 1000);