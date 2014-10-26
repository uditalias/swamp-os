define([
        'AppDispatcher',
        'definitions/SwampApplicationStore',
        'constants/ACTION_SOURCE',
        'constants/SERVER_ACTION_TYPE',
        'constants/CLIENT_ACTION_TYPE'
    ],

    function(AppDispatcher, SwampApplicationStore, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE) {

        var swampApplicationStore = new SwampApplicationStore();

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

                case CLIENT_ACTION_TYPE.APPLICATION_PROMPT:

                    swampApplicationStore.setPrompt(action.promptText, action.onConfirm, action.onCancel, action.hideCancel);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.RESPONSE_APPLICATION_PROMPT:

                    action.confirm ? swampApplicationStore.confirmPrompt() : swampApplicationStore.cancelPrompt();

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.SHOW_CONTEXT_MENU:

                    swampApplicationStore.setContextMenu(action.items, action.position);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.CLEAR_CONTEXT_MENU:

                    swampApplicationStore.clearContextMenu();

                    emitChange = true;

                    break;
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
                swampApplicationStore.emitChange();
            }

        });

        return swampApplicationStore;
    });
