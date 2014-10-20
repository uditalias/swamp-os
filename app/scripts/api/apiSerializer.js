define(function() {

    return {
        serializeSwampService: function(service) {

            return {
                id: service.id,
                name: service.name,
                description: service.description,
                path: service.path,
                script: service.script,
                isRunning: service.isRunning,
                runningEnvironment: service.runningEnvironment,
                pid: service.pid,
                environments: service.environments,
                startTime: service.startTime
            }
        }
    }

});