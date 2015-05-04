var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var options = {
    'inputSrc': './app/main.js',
    'outputSrc': 'app.js'
};

module.exports = function(gulp, plugins, config) {
    process.env.BROWSERIFYSWAP_ENV = config.paths.dist;

    return {
        'develop': function(callback) {
            browserify(options.inputSrc, {debug: true}).bundle()
                .on('error', plugins.util.log)
                .pipe(source(options.outputSrc))
                .pipe(buffer())
                .pipe(plugins.sourcemaps.init({loadMaps: true}))
                .pipe(plugins.sourcemaps.write('./'))
                .pipe(gulp.dest(config.paths.dist + '/scripts/'))
                .on('end', callback);
        },
        'release': function(callback) {
            browserify(options.inputSrc, {debug: true}).bundle()
                .on('error', plugins.util.log)
                .pipe(source(options.outputSrc))
                .pipe(buffer())
                .pipe(plugins.uglify())
                .pipe(gulp.dest(config.paths.dist + '/scripts/'))
                .on('end', callback);
        }
    };
};