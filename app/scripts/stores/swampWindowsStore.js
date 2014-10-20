define([
        'AppDispatcher',
        'definitions/SwampWindowsStore',
        'constants/ACTION_SOURCE',
        'constants/SERVER_ACTION_TYPE',
        'constants/CLIENT_ACTION_TYPE',
        'constants/WINDOW_TYPE'
    ],

    function(AppDispatcher, SwampWindowsStore, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE, WINDOW_TYPE) {

        var swampWindowsStore = new SwampWindowsStore();

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

                case CLIENT_ACTION_TYPE.OPEN_SERVICE_WINDOW:

                    swampWindowsStore.createWindow(WINDOW_TYPE.SERVICE, action.service);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.OPEN_PLUGIN_WINDOW:

                    swampWindowsStore.createWindow(WINDOW_TYPE.PLUGIN, action.plugin);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.FOCUS_WINDOW:

                    swampWindowsStore.focusWindow(action.windowId);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.CLOSE_WINDOW:

                    swampWindowsStore.closeWindow(action.windowId);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.ZOOM_WINDOW:

                    swampWindowsStore.zoomWindow(action.windowId);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.MINIMIZE_WINDOW:

                    swampWindowsStore.minimizeWindow(action.windowId);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.MINIMIZE_ALL_WINDOWS:

                    swampWindowsStore.minimizeAllWindows();

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.CLOSE_ALL_WINDOWS:

                    swampWindowsStore.closeAllWindows();

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.ARRANGE_ALL_WINDOWS:

                    swampWindowsStore.arrangeAllWindows();

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.WINDOW_PROMPT:

                    swampWindowsStore.setWindowPrompt(action.windowId, action.promptText, action.onConfirm, action.onCancel);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.RESPONSE_WINDOW_PROMPT:

                    swampWindowsStore.responseWindowPrompt(action.windowId, action.confirm);

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
                swampWindowsStore.emitChange();
            }

        });

        return swampWindowsStore;
    });