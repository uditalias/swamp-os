/*
 *  helper functions for the Grunt process
 */

module.exports.loadConfig = function(confPath) {
    var object = {};
    var fs = require('fs');
    var path = require('path');
    var key;

    fs.readdirSync(confPath).forEach(function(file) {
        key = file.replace(/\.js$/, '');
        object[key] = require(path.resolve(confPath, file));
    });

    return object;
};