var utils = require('./utils');

module.exports = function(gulp, plugins, config) {
    return function() {
        gulp.src('./app/index.html')
            .pipe(plugins.plumber())
            .pipe(plugins.preprocess({
                'context': {
                    'NODE_ENV': config.mode,
                    'FAKE_STYLES': utils.importStyles(config.develop.externalFiles.css)
                }
            }))
            .pipe(gulp.dest(config.paths.dist));
    };
};