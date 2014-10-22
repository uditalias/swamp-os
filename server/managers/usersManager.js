"use strict";
var EventDispatcher = require('appolo-express').EventDispatcher,
    _               = require('lodash'),
    Q               = require('q');

module.exports = EventDispatcher.define({
    $config: {
        id: 'usersManager',
        singleton: true,
        inject: ['logger', 'env', 'UserModel']
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
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        }.bind(this));

        return deferred.promise;
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
    }
});