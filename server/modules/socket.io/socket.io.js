var appolo   = require('appolo-express'),
    socketio = require('socket.io');

module.exports = function (options) {

    return function (env, inject, app, callback) {

        var io = socketio.listen(app.server);

        inject.addObject('io', io);

        callback();
    }
};