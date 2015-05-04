var utils = require('./utils');

module.exports = function(gulp, plugins, config) {
    return {
        'release': function() {
            gulp.src('app/images/**/*')
                .pipe(gulp.dest(config.paths.dist + '/images'));

            return gulp.src('app/media/**/*')
                .pipe(plugins.imagemin({
                    'optimizationLevel': 5,
                    'progressive': true,
                    'interlaced': true
                }))
                .pipe(gulp.dest(config.paths.dist + '/media'));
        }
    };
};