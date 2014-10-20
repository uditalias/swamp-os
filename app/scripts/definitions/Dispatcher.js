define([], function() {

    var _lastCallbackId = 1;
    var _IdPrefix = 'CALLBACK_ID_';

    function Dispatcher() {
        this._callbacks = {};
        this._isPending = {};
        this._isHandled = {};
        this._isDispatching = false;
        this._pendingPayload = null;
    }

    Dispatcher.prototype.register = function(callback) {
        var callbackId = _IdPrefix + _lastCallbackId++;

        this._callbacks[callbackId] = callback;

        return callbackId;
    };

    Dispatcher.prototype.unregister = function(callbackId) {
        this._callbacks[callbackId] = null;
    };

    Dispatcher.prototype.dispatch = function(payload) {

        this._startDispatching(payload);

        try {
            for (var callbackId in this._callbacks) {
                if (this._isPending[callbackId]) {
                    continue;
                }

                this._invokeCallback(callbackId);
            }
        } finally {

            this._stopDispatching();

        }

    };

    Dispatcher.prototype.isDispatching = function() {
        return this._isDispatching;
    };

    Dispatcher.prototype._invokeCallback = function(callbackId) {
        if(this._callbacks[callbackId]) {
            this._isPending[callbackId] = true;
            this._callbacks[callbackId](this._pendingPayload);
            this._isHandled[callbackId] = true;
        }
    };

    Dispatcher.prototype._startDispatching = function(payload) {
        for (var callbackId in this._callbacks) {
            this._isPending[callbackId] = false;
            this._isHandled[callbackId] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    };

    Dispatcher.prototype._stopDispatching = function() {
        this._pendingPayload = null;
        this._isDispatching = false;
    };

    return Dispatcher;
});