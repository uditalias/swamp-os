var appolo      = require('appolo-express'),
    _           = require('lodash'),
    passport    = require('passport'),
    validator   = appolo.validator;


module.exports = appolo.Controller.define({
    $config: {
        id: 'authController',
        inject: ['env', 'logger', 'usersManager'],
        routes: [
            {
                path: "/api/auth/login/",
                method: 'get',
                controller: 'auth',
                action: 'isLoggedIn',
                middleware: ['userAuthMiddleware']
            },
            {
                path: "/api/auth/login/",
                method: 'post',
                controller: 'auth',
                action: 'login'
            },
            {
                path: "/api/auth/logout/",
                method: 'get',
                controller: 'auth',
                action: 'logout',
                middleware: ['userAuthMiddleware']
            },
            {
                path: '/api/auth/signup/',
                method: 'post',
                controller: 'auth',
                action: 'signup',
                validations: {
                    username: validator.string().trim().min(3).required().regex(/^[\S]*$/),
                    email: validator.string().trim().email().required(),
                    password: validator.string().trim().min(5).required()
                }
            },
            {
                path: '/api/auth/is_free_username/',
                method: 'get',
                controller: 'auth',
                action: 'isFreeUsername',
                validations: {
                    username: validator.string().trim().min(3).required().regex(/^[\S]*$/)
                }
            }
        ]
    },

    isLoggedIn: function(req, res){
        if(req.isAuthenticated()) {
            return this.sendOk(req.user.toObject())
        } else {
            return res.status(401).send("Unauthorized");
        }
    },

    login: function (req, res) {

        passport.authenticate('local', function (err, user, info) {

            if (err) {

                this.logger.error('Login Error', { err: err.toString() });

                this.sendServerError("InvalidUserNameOrPassword");

            } else if (user) {

                if(user.activated) {

                    this._login(user);

                } else {

                    this.sendServerError("UserNotActivated");

                }

            } else {

                this.sendServerError("InvalidUserNameOrPassword");

            }

        }.bind(this))(req, res);

    },

    logout: function () {

        this.req.logout();

        this.sendOk({});
    },

    signup: function(req, res) {

        var params = {
            username: req.param('username').trim(),
            email: req.param('email').trim(),
            password: req.param('password').trim()
        };

        this.usersManager.createUser(params)
            .then(this.usersManager.sendActivationMail.bind(this.usersManager))
            .then(this.sendOk.bind(this))
            .fail(this.sendServerError.bind(this));
    },

    isFreeUsername: function(req, res) {

        this.usersManager.findUserByUsername(req.param('username').trim())
            .then(this._onFindUserByUsernameSuccess.bind(this))
            .fail(this.sendServerError.bind(this));
    },

    _login: function(user) {
        this.req.logIn(user, this._onLogin.bind(this, user));
    },

    _onLogin: function(user, err) {
        if (err) {
            this.logger.error('Login Error', { err: err });

            this.sendServerError("ServerError");
        } else {

            this.logger.info('User Login', { user: user.toObject() });

            this.sendOk(user.toObject());
        }
    },

    _onFindUserByUsernameSuccess: function(user) {
        this.sendOk({ free: !user });
    }
});
