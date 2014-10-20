define([
    'AppDispatcher',
    'definitions/MenuItemsStore',
    'actions/client',
    'env',
    'constants/SWAMP_MODE',
    'constants/ACTION_SOURCE',
    'constants/SERVER_ACTION_TYPE',
    'constants/CLIENT_ACTION_TYPE',
    'constants/WINDOW_OPEN_TRIGGER',
    'constants/PROMPTS',
    'constants/INTERNAL_PLUGINS',
    'stores/swampPluginsStore'
], function(AppDispatcher, MenuItemsStore, clientActions, env, SWAMP_MODE, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE, WINDOW_OPEN_TRIGGER, PROMPTS, INTERNAL_PLUGINS, swampPluginsStore) {

    var _menu = {
        swamp: {
            items: {
                preferences: {
                    lineAfter: true,
                    items: {
                        appearance: {
                            callback: function() {}
                        },
                        swamp_preferences: {
                            callback: function() {}
                        }
                    }
                },
                contribute: {
                    callback: function() {}
                },
                about: {
                    lineAfter: true,
                    callback: function() {

                        var plugin = swampPluginsStore.getByName(INTERNAL_PLUGINS.ABOUT);

                        if(plugin) {
                            clientActions.openPluginWindow(plugin, WINDOW_OPEN_TRIGGER.TOP_MENU);
                        }
                    }
                },
                logout: {
                    callback: function() {}
                }
            }
        },
        services: {
            items: {
                start_all: {
                    callback: function() {
                        if(env.info.mode == SWAMP_MODE.REMOTE) {
                            clientActions.applicationPrompt(PROMPTS.REMOTE_ALL_SERVICES_START, function() {
                                clientActions.startAllServices();
                            });
                        } else {
                            clientActions.startAllServices();
                        }
                    }
                },
                stop_all_running: {
                    callback: function() {
                        if(env.info.mode == SWAMP_MODE.REMOTE) {
                            clientActions.applicationPrompt(PROMPTS.REMOTE_ALL_SERVICES_STOP, function() {
                                clientActions.stopAllRunningServices();
                            });
                        } else {
                            clientActions.stopAllRunningServices();
                        }
                    }
                },
                restart_all_running: {
                    lineAfter: true,
                    callback: function() {
                        if(env.info.mode == SWAMP_MODE.REMOTE) {
                            clientActions.applicationPrompt(PROMPTS.REMOTE_ALL_SERVICES_RESTART, function() {
                                clientActions.restartAllRunningServices();
                            });
                        } else {
                            clientActions.restartAllRunningServices();
                        }
                    }
                },
                manager: {
                    callback: function() {}
                },
                environments_editor: {
                    callback: function() {
                        var plugin = swampPluginsStore.getByName(INTERNAL_PLUGINS.ENVIRONMENTS_EDITOR);

                        if(plugin) {
                            clientActions.openPluginWindow(plugin, WINDOW_OPEN_TRIGGER.TOP_MENU);
                        }
                    }
                }
            }
        },
        logs: {
            items: {
                viewer: {
                    callback: function() {}
                },
                "create_logs_bundle...": {
                    lineAfter: true,
                    callback: function() {}
                },
                clear_all_logs: {
                    callback: function() {}
                }
            }
        },
        plugins: {
            items: {
                "browse...": {
                    callback: function() {}
                },
                "installed": {
                    callback: function() {}
                }
            }
        },
        window: {
            items: {
                minimize_all: {
                    callback: function() {
                        clientActions.minimizeAllWindows();
                    }
                },
                close_all: {
                    callback: function() {
                        clientActions.closeAllWindows();
                    }
                },
                arrange_windows: {
                    callback: function() {
                        clientActions.arrangeAllWindows();
                    }
                }
            }
        },
        help: {
            items: {
                docs: {
                    callback: function() {}
                },
                change_log: {
                    callback: function() {}
                }
            }
        }
    };


    var menuItemsStore = new MenuItemsStore(_menu);

    function _handleServerAction(data) {

        var action = data.action;

        switch(action.actionType) {
            case SERVER_ACTION_TYPE.FIRST_DATA_RECEIVED:

                break;
        }

    }

    function _handleClientAction(data) {

        var action = data.action;

        switch(action.actionType) {
            case CLIENT_ACTION_TYPE.OPEN_SERVICE_WINDOW:
                break;

            case CLIENT_ACTION_TYPE.CLOSE_WINDOW:
                break;
        }

    }

    AppDispatcher.register(function(data) {

        var emitChangeEvent = false;

        if(data.source == ACTION_SOURCE.SERVER_ACTION) {

            emitChangeEvent = _handleServerAction(data);

        } else if(data.source == ACTION_SOURCE.CLIENT_ACTION) {

            emitChangeEvent = _handleClientAction(data);

        }

        if(emitChangeEvent) {
            menuItemsStore.emitChange();
        }

    });

    return menuItemsStore;

});