"use strict";
var appolo      = require('appolo-express'),
    express     = appolo.express,
    env         = appolo.environment,
    _           = require('lodash'),
    passport    = require('passport'),
    session     = require('express-session'),
    mongoStore  = require('connect-mongo')(session);


module.exports = function (app) {

    app.use(session({
        name: 'swamp.os.sid',
        secret: env.session_secret,
        saveUninitialized: true,
        resave: true,
        cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
        store: new mongoStore({
            url: env.mongodb,
            collection: 'sessions'
        })
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(function(req, res, next) {

        res.set('X-Powered-By', 'SwampOS_' + env.version);
        next();

    });
};
