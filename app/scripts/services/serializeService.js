define(function() {

    return {

        serializeSwampService: function(data) {

            return {
                id : data.id,
                name : data.name,
                description : data.description,
                path : data.path,
                script : data.script,
                isRunning : data.isRunning,
                runningEnvironment : data.runningEnvironment,
                pid : data.pid,
                startTime : data.startTime,
                options : data.options,
                environments : data.environments,
                monitorCpu : data.monitor.cpu,
                monitorMemory : data.monitor.memory,
                logs: data.logs,
                monitor: {
                    cpu: false,
                    memory: false
                }
            }

        },

        serializeSwampPlugin: function(data, path) {
            return {
                id: _.guid(),
                name: data.name,
                basePath: path,
                version: data.version,
                main: data.main,
                config: data.config || {}
            };
        },

        serializeMonitorData: function(data) {

            var dto = {
                cpu: false,
                memory: false
            };

            if(!isNaN(data.monitor.cpu)) {
                dto.cpu = data.monitor.cpu;
            }

            if(!isNaN(data.monitor.memory)) {
                dto.memory = data.monitor.memory;
            }

            return dto;

        },

        serializeServiceStart: function(data) {

            return {
                isRunning: data.isRunning,
                runningEnvironment: data.runningEnvironment,
                pid: data.pid,
                startTime: data.startTime
            }

        },

        serializeServiceStop: function(data) {

            return {
                pid: data.pid,
                startTime: data.startTime
            }

        },

        serializeLogData: function(type, log, markAsRead) {

            return {
                type: type,
                text: log.text,
                time: moment(log.time),
                id: _.guid(),
                read: !!markAsRead
            }

        },

        serializeServiceEnvironments: function(data) {

            return data.environments;

        }

    };

});