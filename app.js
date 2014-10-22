"use strict";

var appolo  = require('appolo-express');

appolo.launcher.launch({
    publicFolder: getPublicFoder()
});

function getPublicFoder() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    return process.env.NODE_ENV == 'development' ? 'app' : 'dist/app'
}