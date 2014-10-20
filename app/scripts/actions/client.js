define(['AppDispatcher', 'constants/CLIENT_ACTION_TYPE'], function(AppDispatcher, CLIENT_ACTION_TYPE) {

    var ClientActions = {
        toggleNotificationsPanel: function(state) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.TOGGLE_NOTIFICATIONS_PANEL,
                state: state
            });
        },

        openServiceWindow: function(service, trigger) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.OPEN_SERVICE_WINDOW,
                service: service,
                trigger: trigger
            });
        },

        openPluginWindow: function(plugin, trigger) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.OPEN_PLUGIN_WINDOW,
                plugin: plugin,
                trigger: trigger
            });
        },

        focusWindow: function(windowId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.FOCUS_WINDOW,
                windowId: windowId
            });
        },

        closeWindow: function(windowId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.CLOSE_WINDOW,
                windowId: windowId
            });
        },

        zoomWindow: function(windowId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.ZOOM_WINDOW,
                windowId: windowId
            });
        },

        minimizeWindow: function(windowId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.MINIMIZE_WINDOW,
                windowId: windowId
            });
        },

        startService: function(serviceId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.START_SERVICE,
                serviceId: serviceId
            });
        },

        stopService: function(serviceId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.STOP_SERVICE,
                serviceId: serviceId
            });
        },

        restartService: function(serviceId) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.RESTART_SERVICE,
                serviceId: serviceId
            });
        },

        minimizeAllWindows: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.MINIMIZE_ALL_WINDOWS
            });
        },

        closeAllWindows: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.CLOSE_ALL_WINDOWS
            });
        },

        arrangeAllWindows: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.ARRANGE_ALL_WINDOWS
            });
        },

        browserBlured: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.BROWSER_BLURED
            });
        },

        browserFocused: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.BROWSER_FOCUSED
            });
        },

        windowPrompt: function(windowId, promptText, onConfirm, onCancel) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.WINDOW_PROMPT,
                windowId: windowId,
                promptText: promptText,
                onConfirm: onConfirm,
                onCancel: onCancel
            });
        },

        responseWindowPrompt: function(windowId, confirm) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.RESPONSE_WINDOW_PROMPT,
                windowId: windowId,
                confirm: confirm
            });
        },

        applicationPrompt: function(promptText, onConfirm, onCancel) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.APPLICATION_PROMPT,
                promptText: promptText,
                onConfirm: onConfirm,
                onCancel: onCancel
            });
        },

        responseApplicationPrompt: function(confirm) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.RESPONSE_APPLICATION_PROMPT,
                confirm: confirm
            });
        },

        startAllServices: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.START_ALL_SERVICES
            });
        },

        stopAllRunningServices: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.STOP_ALL_RUNNING_SERVICES
            });
        },

        restartAllRunningServices: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.RESTART_ALL_RUNNING_SERVICES
            });
        },

        showContextMenu: function(items, position) {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.SHOW_CONTEXT_MENU,
                items: items,
                position: position
            });
        },

        clearContextMenu: function() {
            AppDispatcher.dispatchClientAction({
                actionType: CLIENT_ACTION_TYPE.CLEAR_CONTEXT_MENU
            });
        }
    };

    return ClientActions;
});