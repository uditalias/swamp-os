"use strict";
var Class   = require('appolo-express').EventDispatcher,
    Q       = require('q');

module.exports = Class.define({
    $config: {
        id: 'appolo-bootstrap',
        singleton: true,
        inject: []
    },

    run: function (callback) {
        callback();
    }
});
