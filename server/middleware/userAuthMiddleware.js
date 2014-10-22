var appolo  = require('appolo-express'),
    _       = require('lodash');

module.exports = appolo.Middleware.define({
    $config: {
        id: 'userAuthMiddleware',
        inject: ['env', 'logger']
    },

    run: function(req, res, next) {

        if (!req.isAuthenticated()) {
            return res.send(401, "Unauthorized");
        }

        next();
    }
});