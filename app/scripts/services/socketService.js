define(
    ['Q', 'socketio', 'env', 'constants/SOCKET_EVENTS', 'services/serializeService', 'actions/server', 'constants/LOG_TYPE'],
    function(Q, socketio, env, SOCKET_EVENTS, serializeService, serverActions, LOG_TYPE) {

        function SocketService() {
            this._connectionDeferred = null;
            this._socket = null;
        }

        SocketService.prototype.setup = function() {
            this._connectionDeferred = Q.defer();

            this._socket = io.connect('', {
                reconnect: false
            });

            this._bindSocketEvents();

            return this._connectionDeferred.promise;
        };

        SocketService.prototype._bindSocketEvents = function() {

            this._socket.on(SOCKET_EVENTS.CONNECT, this._onSocketConnect.bind(this));

            this._socket.on(SOCKET_EVENTS.DISCONNECT, this._onSocketDisconnect.bind(this));

            this._socket.on(SOCKET_EVENTS.ERROR, this._onSocketError.bind(this));

            this._socket.on(SOCKET_EVENTS.CONNECT_FAILED, this._onSocketError.bind(this));

            this._socket.on(SOCKET_EVENTS.MESSAGE, this._onSocketMessage.bind(this));

        };

        SocketService.prototype.emit = function(event, data) {

            data = data || {};
            event = event.name || event;

            this._socket.emit(event, data);

        };

        SocketService.prototype._onSocketConnect = function() {

            this._connectionDeferred.resolve();

        };

        SocketService.prototype._onSocketDisconnect = function() {

        };

        SocketService.prototype._onSocketError = function(err) {

            this._connectionDeferred.reject(err);

        };

        SocketService.prototype._onSocketMessage = function(message) {
            if(message && message.event) {

                switch(message.event) {

                    case SOCKET_EVENTS.SWAMP_INITIAL:

                        var serializedServices = [];
                        var serializedPlugins = [];

                        _.forEach(message.data.services || [], function(raw) {
                            serializedServices.push(serializeService.serializeSwampService(raw));
                        });

                        _.forEach(message.data.plugins || [], function(raw) {
                            serializedPlugins.push(serializeService.serializeSwampPlugin(raw));
                        });

                        env.info = message.data.swamp.info;

                        serverActions.firstDataReceived(message.data.swamp, serializedServices, serializedPlugins);


                        break;

                    case SOCKET_EVENTS.SWAMP_OUT:

                        var serialized = serializeService.serializeLogData(LOG_TYPE.OUT, message.data.log);

                        serverActions.swampOutLogReceived(serialized);

                        break;

                    case SOCKET_EVENTS.SWAMP_ERROR:

                        var serialized = serializeService.serializeLogData(LOG_TYPE.ERROR, message.data.log);

                        serverActions.swampErrorLogReceived(serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_MONITOR:

                        var serialized = serializeService.serializeMonitorData(message.data);
                        var serviceName = message.data.name;

                        serverActions.serviceMonitorDataReceived(serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_START:

                        var serialized = serializeService.serializeServiceStart(message.data);
                        var serviceName = message.data.name;

                        serverActions.serviceStart(serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_STOP:

                        var serialized = serializeService.serializeServiceStop(message.data);
                        var serviceName = message.data.name;

                        serverActions.serviceStop(serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_RESTART:

                        var serviceName = message.data.name;

                        serverActions.serviceRestart(serviceName);

                        break;

                    case SOCKET_EVENTS.SERVICE_OUT:

                        var serialized = serializeService.serializeLogData(LOG_TYPE.OUT, message.data.log);
                        var serviceName = message.data.name;

                        serverActions.serviceOutLogReceived(serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.SERVICE_ERROR:

                        var serialized = serializeService.serializeLogData(LOG_TYPE.ERROR, message.data.log);
                        var serviceName = message.data.name;

                        serverActions.serviceErrorLogReceived(serviceName, serialized);

                        break;

                    case SOCKET_EVENTS.MODIFY_SERVICE_ENVIRONMENTS:

                        var serialized = serializeService.serializeServiceEnvironments(message.data);
                        var serviceName = message.data.name;

                        serverActions.serviceEnvironmentsModified(serviceName, serialized);

                        break;
                }

            }
        };

        return new SocketService();

    });