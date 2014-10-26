define(['Q', 'services/serializeService', 'actions/client'], function(Q, serializeService, clientActions) {

    function AuthService() {

        this._isLoggedIn = false;
        this._user = null;

    }

    AuthService.prototype.isLoggedIn = function() {

        return this._isLoggedIn;

    };

    AuthService.prototype.isAuthenticated = function() {

        var deferred = Q.defer();

        $.get('/api/auth/login/')
            .then(_onLoginSuccess.bind(this, deferred))
            .fail(_onAuthActionFail.bind(this, deferred));

        return deferred.promise;

    };

    AuthService.prototype.login = function(username, password) {

        var deferred = Q.defer();

        $.post('/api/auth/login/', { username: username, password: password })
            .then(_onLoginSuccess.bind(this, deferred))
            .fail(_onAuthActionFail.bind(this, deferred));

        return deferred.promise;
    };

    AuthService.prototype.signup = function(username, email, password) {

        var deferred = Q.defer();

        $.post('/api/auth/signup/', { username: username, email: email, password: password })
            .then(deferred.resolve)
            .fail(_onAuthActionFail.bind(this, deferred));

        return deferred.promise;

    };

    AuthService.prototype.logout = function() {
        var deferred = Q.defer();

        $.get('/api/auth/logout/')
            .then(_onLogout.bind(this, deferred));

        return deferred.promise;
    };

    AuthService.prototype.dispose = function() {
    };

    function _onLoginSuccess(deferred, response) {

        this._isLoggedIn = true;
        this._user = serializeService.serializeAPIReponse(response);

        deferred.resolve(this._user);

    }

    function _onAuthActionFail(deferred, response) {

        deferred.reject(serializeService.serializeAPIReponse(response));

    }

    function _onLogout(deferred) {
        this._isLoggedIn = false;
        this._user = null;

        clientActions.logout();

        deferred.resolve();
    }

    return new AuthService();

});
