var utils = require('./utils');

module.exports = function(gulp, plugins, config) {
    return {
        'release': function() {
            return gulp.src('app/fonts/**/*')
                .pipe(gulp.dest(config.paths.dist + '/fonts'));
        }
    };
};