"use strict";
var appolo = require('appolo-express'),
    mongoose = require('mongoose');



module.exports = function (options) {

    return function (env, inject,logger, callback) {
        mongoose.connect(env.mongodb);

        mongoose.connection.on('error', function (e) {
            logger.error('connection error', {error:e});
        });

        mongoose.connection.once('open', function () {
            logger.info('mongodb connection open');
        });

        inject.addObject('db', mongoose);

        callback();
    }
};
