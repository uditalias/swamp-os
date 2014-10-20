"use strict";

var appolo      = require('appolo-express'),
    socketio    = require('./socket.io/socket.io');

appolo.module.register(socketio());