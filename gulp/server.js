var browserSync = require('browser-sync');
var config = require('./config.json');

var server = {
    'state': {}
};

server.cdn = function(type) {
    server.state.cdn = server.state.cdn || browserSync.create().init({
        'open': false,
        'host': config.cdn.host,
        'port': config.cdn.port,
        'logConnections': false,
        'logSnippet': false,
        'ui': false,
        'server': {
            'baseDir': './',
            'directory': true,
            'middleware': function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });

    return server.state.cdn;
};

server.live = function() {
    server.state.live = server.state.live || browserSync.create().init({
        'server': {
            'baseDir': config.paths.dist
        }
    });

    return server.state.live;
};

module.exports = server;