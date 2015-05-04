var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var config = require('./config.json');
var lodash = require('lodash');

var argv = require('yargs').argv;
var filesystem = require('fs');
var utils = {};

config.mode = argv.release ? 'release' : 'develop';

utils.getTask = function(name) {
    var task = require('./' + name)(gulp, plugins, config);

    if (typeof task === 'object') {
        if (task[config.mode]) {
            return task[config.mode];
        }
    } else {
        return task;
    }
};

utils.template = function(string, options) {
    lodash.templateSettings.interpolate = /{([\s\S]+?)}/g;
    return lodash.template(string)(options);
};

utils.cdn = function(string) {
    var options = {
        'host': config.cdn.host,
        'port': config.cdn.port
    };

    return utils.template('http://{host}:{port}' + (string || ''), options);
};

utils.importStyles = function(files) {
    return files.map(function(file) {
        return '<link rel="stylesheet" href="' + utils.cdn(file) + '">';
    }).join("\n");
};

module.exports = utils;