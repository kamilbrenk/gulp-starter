var del = require('del');

module.exports = function(gulp, plugins, config) {
    return function(callback) {
        del([
            config.paths.dist + '/*',
            config.paths.temp
        ], callback);
    };
};