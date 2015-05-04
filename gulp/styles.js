var server = require('./server');
var utils = require('./utils');

var options = {
    'sass': {
        'errLogToConsole': true,
        'cacheLocation': '_sass'
    },
    'minifyCss': {
        'keepSpecialComments': 0
    },
    'autoprefixer': ['last 2 version', '> 1%', 'ie 9'],
    'inputSrc': './app/scss/main.scss',
    'outputSrc': 'app.css'
};

module.exports = function(gulp, plugins, config) {
    return {
        'develop': function() {
            server.cdn();

            return gulp.src(options.inputSrc)
                .pipe(plugins.plumber())
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.sass(options.sass))
                .pipe(plugins.replace(/'images\//g, "'" + utils.cdn(config.develop.path.images)))
                .pipe(plugins.replace(/'media\//g, "'" + utils.cdn(config.develop.path.media)))
                .pipe(plugins.replace(/'fonts\//g, "'" + utils.cdn(config.develop.path.fonts)))
                .pipe(plugins.csslint())
                .pipe(plugins.csslint.reporter())
                .pipe(plugins.autoprefixer.apply(this, plugins.autoprefixer))
                .pipe(plugins.rename(options.outputSrc))
                .pipe(plugins.sourcemaps.write())
                .pipe(gulp.dest(config.paths.dist + '/styles/'));
        },
        'release': function() {
            var externalCss = config.develop.externalFiles.css.map(function(file) {
                return '.' + file;
            });

            gulp.src(externalCss)
                .pipe(plugins.concat('vendor.css'))
                .pipe(plugins.minifyCss(options.minifyCss))
                .pipe(gulp.dest(config.paths.dist + '/styles/'));

            return gulp.src(options.inputSrc)
                .pipe(plugins.sass(options.sass))
                .pipe(plugins.replace(/'images\//g, "'../images/"))
                .pipe(plugins.replace(/'media\//g, "'../media/"))
                .pipe(plugins.replace(/'fonts\//g, "'../fonts/"))
                .pipe(plugins.autoprefixer.apply(this, plugins.autoprefixer))
                .pipe(plugins.minifyCss(options.minifyCss))
                .pipe(plugins.rename(options.outputSrc))
                .pipe(gulp.dest(config.paths.dist + '/styles/'));
        }
    };
};