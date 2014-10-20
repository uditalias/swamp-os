define(['AppDispatcher', 'constants/SERVER_ACTION_TYPE'], function(AppDispatcher, SERVER_ACTION_TYPE) {

    var ServerActions = {

        firstDataReceived: function(swampData, rawServices, rawPlugins) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.FIRST_DATA_RECEIVED,
                swampData: swampData,
                rawServices: rawServices,
                rawPlugins: rawPlugins
            });
        },

        swampOutLogReceived: function(logMessage) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SWAMP_OUT_LOG_MESSAGE,
                logMessage: logMessage
            });
        },

        swampErrorLogReceived: function(logMessage) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SWAMP_ERROR_LOG_MESSAGE,
                logMessage: logMessage
            });
        },

        serviceMonitorDataReceived: function(serviceName, monitorData) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SERVICE_MONITOR_DATA,
                serviceName: serviceName,
                monitorData: monitorData
            });
        },

        serviceStart: function(serviceName, serviceData) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SERVICE_START,
                serviceName: serviceName,
                serviceData: serviceData
            });
        },

        serviceStop: function(serviceName, serviceData) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SERVICE_STOP,
                serviceName: serviceName,
                serviceData: serviceData
            });
        },

        serviceRestart: function(serviceName) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SERVICE_RESTART,
                serviceName: serviceName
            });
        },

        serviceOutLogReceived: function(serviceName, logMessage) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SERVICE_OUT_LOG_MESSAGE,
                serviceName: serviceName,
                logMessage: logMessage
            });
        },

        serviceErrorLogReceived: function(serviceName, logMessage) {
            AppDispatcher.dispatchServerAction({
                actionType: SERVER_ACTION_TYPE.SERVICE_ERROR_LOG_MESSAGE,
                serviceName: serviceName,
                logMessage: logMessage
            });
        },

        serviceEnvironmentsModified: function(serviceName, environments) {
            //console.log('serviceEnvironmentsModified', serviceName, environments);
        }
    };

    return ServerActions;
});