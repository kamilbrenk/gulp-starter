var stylish = require('jshint-stylish');

module.exports = function(gulp, plugins, config) {
    return function() {
        gulp.src(['./app/**/*.js', './test/**/*.js'])
            .pipe(plugins.plumber())
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter(stylish));
    };
};