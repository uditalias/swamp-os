define([
        'EventEmitter',
        'api/apiSerializer',
        'env',
        'stores/swampServicesStore'
    ],

    function(EventEmitter, apiSerializer, env, swampServicesStore) {

        function SwampPluginsAPI() {
            this.super = EventEmitter;
            this.super();

            this.info = {
                version: env.version
            }
        }

        SwampPluginsAPI.prototype = new EventEmitter;

        SwampPluginsAPI.prototype.sendMessage = function(payload) {
            this.emit('message', payload);
        };

        SwampPluginsAPI.prototype.setMenuTree = function(menuTree) {

            this.emit('request', { name: 'setMenuTree', payload: menuTree });

        };

        SwampPluginsAPI.prototype.services = {
            getAll: function() {
                var services = swampServicesStore.getAll();
                var serialized = {};

                _.forEach(services, function(service, serviceId) {
                    serialized[serviceId] = apiSerializer.serializeSwampService(service);
                });

                return serialized;
            },

            getByName: function(name) {
                var service = swampServicesStore.getByName(name);

                if(service) {
                    return apiSerializer.serializeSwampService(service);
                }
                return null;
            },

            getById: function(id) {
                var service = swampServicesStore.getById(id);

                if(service) {
                    return apiSerializer.serializeSwampService(service);
                }
                return null;
            }
        };

        SwampPluginsAPI.prototype.actions = {
            startService: function(service) {

            },

            stopService: function(service) {

            },

            restartService: function(service) {

            },

            startAllServices: function() {

            },

            stopAllRunningServices: function() {

            },

            restartAllRunningServices: function() {

            }
        };

        return SwampPluginsAPI;
    });