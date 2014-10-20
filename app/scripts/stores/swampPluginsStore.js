define(

    [
        'AppDispatcher',
        'definitions/SwampPluginsStore',
        'definitions/SwampPlugin',
        'constants/ACTION_SOURCE',
        'constants/SERVER_ACTION_TYPE',
        'constants/CLIENT_ACTION_TYPE'
    ],

    function(AppDispatcher, SwampPluginsStore, SwampPlugin, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE) {

        var _internalPlugins = [
            '/scripts/plugins/about/',
            '/scripts/plugins/environmentsEditor/'
        ];

        var swampPluginsStore = new SwampPluginsStore(_internalPlugins);

        function _handleServerAction(data) {

            var action = data.action;
            var emitChange = false;
            var plugin;

            switch(action.actionType) {
                case SERVER_ACTION_TYPE.FIRST_DATA_RECEIVED:

                    _.forEach(action.rawPlugins, function(raw) {

                        plugin = new SwampPlugin(raw);

                        swampPluginsStore.addPlugin(plugin);
                    });

                    emitChange = true;

                    break;
            }

            plugin = null;

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
                swampPluginsStore.emitChange();
            }

        });

        return swampPluginsStore;
    });