define(['definitions/Dispatcher', 'constants/ACTION_SOURCE'], function(Dispatcher, ACTION_SOURCE) {

    function AppDispatcher() {
        this.super = Dispatcher;
        this.super();
    }

    AppDispatcher.prototype = new Dispatcher;

    AppDispatcher.prototype.dispatchClientAction = function(action) {
        this.dispatch({
            source: ACTION_SOURCE.CLIENT_ACTION,
            action: action
        });
    };

    AppDispatcher.prototype.dispatchServerAction = function(action) {
        this.dispatch({
            source: ACTION_SOURCE.SERVER_ACTION,
            action: action
        });
    };

    return new AppDispatcher();
});