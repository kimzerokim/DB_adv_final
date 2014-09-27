/**
 * Created by youngkim on 2014. 9. 28..
 */
exports.MysqlDumpError = function(message) {
    this.name = 'MysqlDumpError';
    this.message = (message || '');
};
exports.MysqlDumpError.prototype = new Error();
