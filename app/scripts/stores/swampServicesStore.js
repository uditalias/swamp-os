define([
        'AppDispatcher',
        'definitions/SwampServicesStore',
        'definitions/SwampService',
        'constants/ACTION_SOURCE',
        'constants/SERVER_ACTION_TYPE',
        'constants/CLIENT_ACTION_TYPE'
    ],

    function(AppDispatcher, SwampServicesStore, SwampService, ACTION_SOURCE, SERVER_ACTION_TYPE, CLIENT_ACTION_TYPE) {

        var swampServicesStore = new SwampServicesStore();

        function _handleServerAction(data) {

            var action = data.action;
            var emitChange = false;
            var service;

            switch(action.actionType) {
                case SERVER_ACTION_TYPE.FIRST_DATA_RECEIVED:

                    _.forEach(action.rawServices, function(raw) {

                        service = new SwampService(raw);

                        swampServicesStore.addService(service);
                    });

                    emitChange = true;

                    break;

                case SERVER_ACTION_TYPE.SERVICE_MONITOR_DATA:

                    service = swampServicesStore.getByName(action.serviceName);

                    if(service) {
                        service.updateMonitorData(action.monitorData);
                        emitChange = true;
                    }

                    break;

                case SERVER_ACTION_TYPE.SERVICE_START:

                    service = swampServicesStore.getByName(action.serviceName);

                    if(service) {
                        service.forceStart(action.serviceData);
                        emitChange = true;
                    }

                    break;

                case SERVER_ACTION_TYPE.SERVICE_STOP:

                    service = swampServicesStore.getByName(action.serviceName);

                    if(service) {
                        service.forceStop(action.serviceData);
                        emitChange = true;
                    }

                    break;

                case SERVER_ACTION_TYPE.SERVICE_RESTART:

                    service = swampServicesStore.getByName(action.serviceName);

                    if(service) {
                        service.forceRestart();
                        emitChange = true;
                    }

                    break;

                case SERVER_ACTION_TYPE.SERVICE_OUT_LOG_MESSAGE:

                    service = swampServicesStore.getByName(action.serviceName);

                    if(service) {
                        service.addOut(action.logMessage);
                        emitChange = true;
                    }

                    break;

                case SERVER_ACTION_TYPE.SERVICE_ERROR_LOG_MESSAGE:

                    service = swampServicesStore.getByName(action.serviceName);

                    if(service) {
                        service.addError(action.logMessage);
                        emitChange = true;
                    }

                    break;

            }

            service = null;

            return emitChange;
        }

        function _handleClientAction(data) {

            var action = data.action;
            var emitChange = false;

            switch(action.actionType) {
                case CLIENT_ACTION_TYPE.START_SERVICE:
                    swampServicesStore.startService(action.serviceId);

                    emitChange = true;

                    break;
                case CLIENT_ACTION_TYPE.STOP_SERVICE:
                    swampServicesStore.stopService(action.serviceId);

                    emitChange = true;

                    break;
                case CLIENT_ACTION_TYPE.RESTART_SERVICE:
                    swampServicesStore.restartService(action.serviceId);

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.START_ALL_SERVICES:
                    swampServicesStore.startAllServices();

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.STOP_ALL_RUNNING_SERVICES:
                    swampServicesStore.stopAllRunningServices();

                    emitChange = true;

                    break;

                case CLIENT_ACTION_TYPE.RESTART_ALL_RUNNING_SERVICES:
                    swampServicesStore.restartAllRunningServices();

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
                swampServicesStore.emitChange();
            }

        });

        return swampServicesStore;
    });