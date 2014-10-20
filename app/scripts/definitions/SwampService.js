define([
        'EventEmitter',
        'definitions/AggregatedData',
        'constants/SERVICE_STATE',
        'services/serializeService',
        'constants/LOG_TYPE',
        'constants/AGGREGATED_LIST_TYPE',
        'moment',
        'MD5',
        'Identicon',
        'pnglib'
    ],

    function(EventEmitter, AggregatedData, SERVICE_STATE, serializeService, LOG_TYPE, AGGREGATED_LIST_TYPE, moment, MD5, Identicon) {

        function SwampService(params) {
            this.super = EventEmitter;
            this.super();

            this.id = params.id;
            this.name = params.name;
            this.description = params.description;
            this.path = params.path;
            this.script = params.script;
            this.isRunning = params.isRunning;
            this.runningEnvironment = params.runningEnvironment;
            this.selectedEnvironment = params.runningEnvironment;
            this.pid = params.pid;
            this.options = params.options;
            this.environments = params.environments;
            this.monitorCpu = params.monitor.cpu;
            this.monitorMemory = params.monitor.memory;
            this.monitor = params.monitor;
            this.state = this.isRunning ? SERVICE_STATE.RUN : SERVICE_STATE.STOP;
            this.startTime = params.startTime;

            this._createMonitorDataContainers();
            this._createLogDataContainers(this.options.maxLogsToSave);

            this._initializeLogs(params.logs);

            this._createAvatar();
        }

        SwampService.prototype = new EventEmitter;

        SwampService.prototype.setEnvironments = function(environments) {

            this.environments = environments;

        };

        SwampService.prototype.setSelectedEnvironment = function(environment) {
            if(environment in this.environments) {
                this.selectedEnvironment = environment;
            }
        };

        SwampService.prototype.updateMonitorData = function(monitorData) {

            this.monitor = monitorData;

            if(!isNaN(this.monitor.cpu)) {

                this.cpuData.add({ key: _.guid(), value: this.monitor.cpu });

            }

            if(!isNaN(this.monitor.memory)) {

                this.memoryData.add({ key: _.guid(), value: this.monitor.memory });

            }
        };

        SwampService.prototype.forceStop = function() {

            this.pid = null;

            this.isRunning = false;

            this.startTime = null;

            this.cpuData.clear();

            this.memoryData.clear();

            this.monitor.cpu = false;

            this.monitor.memory = false;

            this.state = SERVICE_STATE.STOP;
        };

        SwampService.prototype.forceStart = function(data) {

            this._merge(data);

            this.state = SERVICE_STATE.RUN;
        };

        SwampService.prototype.forceRestart = function() {
            this.state = SERVICE_STATE.RESTART;
        };

        SwampService.prototype.log = function(logType, log) {

            var serialized = serializeService.serializeLogData(logType, log);

            switch(logType) {

                case LOG_TYPE.OUT:

                    this.outLogData.add(serialized);

                    break;

                case LOG_TYPE.ERROR:

                    this.errorLogData.add(serialized);

                    break;
            }

        };

        SwampService.prototype.addOut = function(message) {
            this.outLogData.add(message);
        };

        SwampService.prototype.addError = function(message) {
            this.errorLogData.add(message);
        };

        SwampService.prototype.clearErrorLogs = function() {

            this.errorLogData.clear();

        };

        SwampService.prototype.clearOutLogs = function() {

            this.outLogData.clear();

        };

        SwampService.prototype.clearLogs = function() {

            this.clearErrorLogs();

            this.clearOutLogs();

        };

        SwampService.prototype.getContextMenu = function() {
            return {
                "out_log": {
                    callback: function() {  }.bind(this)
                },
                "error_log": {
                    callback: function() {  }.bind(this)
                },
                "actions": {
                    lineBefore: true,
                    items: {
                        "restart": {
                            disabled: this.state != SERVICE_STATE.RUN,
                            callback: function() {

                                this.emit('contextMenuRestart');

                            }.bind(this)
                        },
                        "start": {
                            disabled: this.state != SERVICE_STATE.STOP,
                            callback: function() {

                                this.emit('contextMenuStart');

                            }.bind(this)
                        },
                        "stop": {
                            disabled: this.state != SERVICE_STATE.RUN,
                            callback: function() {

                                this.emit('contextMenuStop');

                            }.bind(this)
                        },
                        "force_stop": {
                            callback: function() {

                                this.emit('contextMenuStop');

                            }.bind(this)
                        }
                    }
                }

            };
        };

        SwampService.prototype.dispose = function() {

            this.forceStop();

        };

        SwampService.prototype._merge = function(params) {

            _.assign(this, params);

        };

        SwampService.prototype._createMonitorDataContainers = function() {

            this.cpuData = new AggregatedData(AGGREGATED_LIST_TYPE.FIFO, 30);

            this.memoryData = new AggregatedData(AGGREGATED_LIST_TYPE.FIFO, 30);

        };

        SwampService.prototype._createLogDataContainers = function(maxLength) {

            this.outLogData = new AggregatedData(AGGREGATED_LIST_TYPE.FIFO, maxLength);

            this.errorLogData = new AggregatedData(AGGREGATED_LIST_TYPE.FIFO, maxLength);

        };

        SwampService.prototype._initializeLogs = function(logs) {

            var self = this,
                serialized;

            if(logs.err) {

                _.forEach(logs.err, function(log) {

                    serialized = serializeService.serializeLogData(LOG_TYPE.ERROR, log);

                    self.errorLogData.add(serialized);

                });

            }

            if(logs.out) {

                _.forEach(logs.out, function(log) {

                    serialized = serializeService.serializeLogData(LOG_TYPE.OUT, log);

                    self.outLogData.add(serialized);

                });

            }

        };

        SwampService.prototype._createAvatar = function() {

            var avatarMD5 = MD5(this.name);

            var identiconBase64 = new window.Identicon(avatarMD5, 150).toString();

            this.avatarBase64Url = "data:image/png;base64," + identiconBase64;
        };

        return SwampService;
    });