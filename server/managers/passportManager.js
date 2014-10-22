"use strict";
var EventDispatcher = require('appolo-express').EventDispatcher,
    _               = require('lodash'),
    Q               = require('q'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy;


module.exports = EventDispatcher.define({
    $config: {
        id: 'passportManager',
        singleton: true,
        initMethod: 'initialize',
        inject: ['logger', 'env', 'UserModel', 'usersManager']
    },

    initialize: function () {

        passport.serializeUser(this._onSerializeUser.bind(this));

        passport.deserializeUser(this._onDeserializeUser.bind(this));

        passport.use(new LocalStrategy(this._onLocalStrategy.bind(this)));
    },

    _onSerializeUser: function (user, done) {
        done(null, user.id);
    },

    _onDeserializeUser: function (id, done) {
        this.UserModel.findById(id, function (err, user) {
            done(err, user);
        }.bind(this));
    },

    _onLocalStrategy: function (username, password, done) {

        this.usersManager.findUserByUsername(username)
            .then(this._onFindUserByUsername.bind(this, username))
            .then(this._comparePassword.bind(this, password))
            .spread(this._onPasswordCompare.bind(this))
            .then(done.bind(null, null))
            .fail(done);

    },
    _onFindUserByUsername: function (username, user) {
        if (!user) {

            throw new Error("Unknown user " + username);

        }

        return user;
    },

    _comparePassword: function (password, user) {

        return Q.all([user, user.comparePassword(password)]);
    },

    _onPasswordCompare: function (user, isMatch) {
        if (!isMatch) {

            throw new Error("Invalid Username or password");
        }

        return user;
    }
});