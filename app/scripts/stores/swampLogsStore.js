define([
        'AppDispatcher',
        'definitions/SwampLogsStore',
        'constants/ACTION_SOURCE',
        'constants/SERVER_ACTION_TYPE',
        'constants/CLIENT_ACTION_TYPE',
        'constants/LOG_TYPE',
        'services/serializeService'
    ],

    function(AppDispatcher, SwampLogsStore, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE, LOG_TYPE, serializeService) {

        var swampLogsStore = new SwampLogsStore();

        function _handleServerAction(data) {

            var action = data.action;
            var emitChangeEvent = false;

            switch(action.actionType) {
                case SERVER_ACTION_TYPE.FIRST_DATA_RECEIVED:

                    if(action.swampData.logs && (action.swampData.logs.err || action.swampData.logs.out)) {

                        var serialized;

                        _.forEach(action.swampData.logs.err, function(message) {

                            serialized = serializeService.serializeLogData(LOG_TYPE.ERROR, message, true);

                            swampLogsStore.addError(serialized);

                        });

                        _.forEach(action.swampData.logs.out, function(message) {

                            serialized = serializeService.serializeLogData(LOG_TYPE.OUT, message, true);

                            swampLogsStore.addOut(serialized);

                        });

                        emitChangeEvent = true;
                    }

                    break;
                case SERVER_ACTION_TYPE.SWAMP_OUT_LOG_MESSAGE:

                    swampLogsStore.addOut(action.logMessage);

                    emitChangeEvent = true;

                    break;
                case SERVER_ACTION_TYPE.SWAMP_ERROR_LOG_MESSAGE:

                    swampLogsStore.addError(action.logMessage);

                    emitChangeEvent = true;

                    break;
            }

            return emitChangeEvent;

        }

        function _handleClientAction(data) {

            var action = data.action;
            var emitChangeEvent = false;

            switch(action.actionType) {

                case CLIENT_ACTION_TYPE.TOGGLE_NOTIFICATIONS_PANEL:

                    swampLogsStore.setPanelState(action.state);

                    emitChangeEvent = true;

                    break;

                case CLIENT_ACTION_TYPE.BROWSER_BLURED:

                    swampLogsStore.setIsBrowserFocused(false);

                    break;

                case CLIENT_ACTION_TYPE.BROWSER_FOCUSED:

                    swampLogsStore.setIsBrowserFocused(true);

                    break;

            }

            return emitChangeEvent;
        }

        AppDispatcher.register(function(data) {

            var emitChangeEvent = false;

            if(data.source == ACTION_SOURCE.SERVER_ACTION) {

                emitChangeEvent = _handleServerAction(data);

            } else if(data.source == ACTION_SOURCE.CLIENT_ACTION) {

                emitChangeEvent = _handleClientAction(data);

            }

            if(emitChangeEvent) {
                swampLogsStore.emitChange();
            }

        });

        return swampLogsStore;
    });