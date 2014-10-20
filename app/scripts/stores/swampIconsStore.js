define([
        'AppDispatcher',
        'definitions/SwampIconsStore',
        'constants/ACTION_SOURCE',
        'constants/SERVER_ACTION_TYPE',
        'constants/CLIENT_ACTION_TYPE'
    ],

    function(AppDispatcher, SwampIconsStore, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE) {

        var swampIconsStore = new SwampIconsStore();

        function _handleServerAction(data) {

            var action = data.action;
            var emitChange = false;

            switch(action.actionType) {
            }

            return emitChange;
        }

        function _handleClientAction(data) {

            var action = data.action;
            var emitChange = false;

            switch(action.actionType) {

            }

            return emitChange;
        }

        AppDispatcher.register(function(data) {

            var emitChangeEvent = false;

            if(data.source == ACTION_SOURCE.SERVER_ACTION) {

                emitChangeEvent = _handleServerAction(data);

            } else if(data.source == ACTION_SOURCE.CLIENT_ACTION) {

                emitChangeEvent = _handleClientAction(data);

            }

            if(emitChangeEvent) {
                swampIconsStore.emitChange();
            }

        });

        return swampIconsStore;
    });