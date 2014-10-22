var winston = require('winston'),
    appolo = require('appolo-express');


module.exports = function (options) {

    return function (env, inject, callback) {
        var transports = [];

        transports.push(new (winston.transports.Console)({
            json: false,
            timestamp: true,
            handleExceptions: true
        }));

        var logger = new (winston.Logger)({
            transports: transports,
            exitOnError: false
        });

        inject.addObject('logger', logger);

        callback();
    }
};

