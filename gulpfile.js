var gulp = require('gulp');
var server = require('./gulp/server');
var utils = require('./gulp/utils');

gulp.task('clean', utils.getTask('clean'));
gulp.task('html', utils.getTask('html'));
gulp.task('styles', utils.getTask('styles'));
gulp.task('scripts', utils.getTask('scripts'));
gulp.task('images', utils.getTask('images'));
gulp.task('fonts', utils.getTask('fonts'));
gulp.task('test', utils.getTask('test'));

gulp.task('build', [
    'html',
    'styles',
    'scripts',
    'images',
    'fonts',
    'test'
]);

gulp.task('watch', ['build'], function(callback) {
    server.live();

    gulp.watch(['./app/**/*.js', './app/**/*.hbs'], ['scripts']);
    gulp.watch(['./app/main.scss', './app/**/*.scss'], ['styles']);
    gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('watch');
});