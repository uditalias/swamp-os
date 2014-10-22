"use strict";
var appolo  = require('appolo-express'),
    path    = require('path'),
    version = require(path.join(process.cwd(), 'package.json')).version;

module.exports = appolo.Controller.define({
    $config:{
        id:'indexController',
        inject: [ 'env' ],
        routes: [{
            path: '/',
            method: 'get',
            action: 'index'
        }]
    },

    index: function(req, res) {
        this.render('index', {
            envName: this.env.type,
            version: version
        });
    }
});