"use strict";

var appolo      = require('appolo-express'),
    logger      = require('./logger/logger'),
    mongo       = require('./mongo/mongo'),
    socketio    = require('./socket.io/socket.io');

appolo.use(logger());
appolo.use(mongo());
appolo.use(socketio());