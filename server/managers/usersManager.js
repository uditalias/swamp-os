"use strict";
var EventDispatcher = require('appolo-express').EventDispatcher,
    _               = require('lodash'),
    jwt             = require('jsonwebtoken'),
    Q               = require('q');

module.exports = EventDispatcher.define({
    $config: {
        id: 'usersManager',
        singleton: true,
        inject: ['logger', 'env', 'UserModel', 'util', 'mailSenderManager']
    },

    findUserById: function (id) {
        var deferred = Q.defer();

        this.UserModel.findById(id, function (err, doc) {
            if (err) {
                this.logger.error("failed to find user by id", { err: err });
                deferred.reject();
            } else {
                deferred.resolve(doc);
            }
        }.bind(this));

        return deferred.promise;
    },

    findUserByUsername: function (username) {
        var deferred = Q.defer();

        this.UserModel.findOne({username: username}, function (err, doc) {
            if (err) {
                this.logger.error("failed to find user by name", { err: err });
                deferred.reject();
            } else {
                deferred.resolve(doc);
            }
        }.bind(this));

        return deferred.promise;
    },

    createUser: function (params) {
        var deferred = Q.defer();
        var user = new this.UserModel(params);

        user.save(function (err) {
            if (err) {
                this.logger.error("failed to save user", {err: err});
                deferred.reject(this.util.parseMongoError(err, this._getSignupErrorMessages()));
            } else {
                deferred.resolve(user);
            }
        }.bind(this));

        return deferred.promise;
    },

    sendActivationMail: function(user) {

        this.mailSenderManager.sendMail({
            type: 'account_activation',
            sender: this.env.mail_sender_address,
            senderName: 'Swamp OS',
            receiver: user.email,
            receiverName: user.username,
            payload: {
                user: user.toObject(),
                token: this._createActivationToken(user.email, user.username)
            }
        });

        return user.toObject();
    },

    updateUser: function (params) {

        var self = this;
        var deferred = Q.defer();
        var changes = {};

        params.username && (changes['username'] = params.username);
        params.email && (changes['email'] = params.email);
        params.password && (changes['password'] = params.password);

        changes['activated'] = !!params.activated;

        this.UserModel.findById(params.id, function (err, user) {
            if (err) {
                self.logger.error("failed to update user", {err: err});

                deferred.reject();
            } else {

                _.extend(user, changes);

                user.save(function (err, user) {
                    if (err) {
                        self.logger.error("failed to update user", {err: err});

                        deferred.reject();
                    }
                    else {
                        deferred.resolve(user);
                    }
                });
            }
        });

        return deferred.promise;
    },

    deleteUser: function (id) {
        var deferred = Q.defer();

        this.UserModel.remove({ _id: id }, function (err, user) {
            if (err) {

                this.logger.error("failed to delete user", {err: err});

                deferred.reject();
            } else {

                deferred.resolve(user);
            }
        }.bind(this));

        return deferred.promise;
    },

    _getSignupErrorMessages: function() {
        return {
            11000: {
                username: ['Username taken'],
                email: ['Email address in use, try to login']
            }
        }
    },

    _createActivationToken: function(email, username) {
        return jwt.sign({ email: email, username: username }, this.env.json_token_secret);
    }
});
