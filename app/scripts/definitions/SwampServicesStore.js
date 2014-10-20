define(['EventEmitter', 'constants/SERVICE_STATE', 'constants/SOCKET_EVENTS', 'services/socketService'], function(EventEmitter, SERVICE_STATE, SOCKET_EVENTS, socketService) {

    var CHANGE_EVENT = 'change';

    function SwampServicesStore() {
        this.super = EventEmitter;
        this.super();

        this._servicesRepository = {};
    }

    SwampServicesStore.prototype = new EventEmitter;

    SwampServicesStore.prototype.addService = function(service) {

        this._servicesRepository[service.id] = service;

    };

    SwampServicesStore.prototype.count = function() {
        return Object.keys(this._servicesRepository).length;
    };

    SwampServicesStore.prototype.runningServicesCount = function() {
        return _.filter(this._servicesRepository, function(service) {
            return service.state == SERVICE_STATE.RUN;
        }).length;
    };

    SwampServicesStore.prototype.stoppedServiceCount = function() {
        return _.filter(this._servicesRepository, function(service) {
            return service.state == SERVICE_STATE.STOP;
        }).length;
    };

    SwampServicesStore.prototype.getAll = function() {
        return this._servicesRepository;
    };

    SwampServicesStore.prototype.getAllRunning = function() {
        return _.filter(this._servicesRepository, function(service) {
            return service.isRunning;
        })
    };

    SwampServicesStore.prototype.getById = function(id) {
        return this._servicesRepository[id];
    };

    SwampServicesStore.prototype.getByName = function(name) {
        return _.filter(this._servicesRepository, function(service) {
            return service.name == name;
        })[0];
    };

    SwampServicesStore.prototype.startService = function(serviceId) {
        var service = this.getById(serviceId);
        if(service) {

            socketService.emit(SOCKET_EVENTS.SERVICE_START, {
                name: service.name,
                environment: service.selectedEnvironment
            });
        }
    };

    SwampServicesStore.prototype.stopService = function(serviceId) {
        var service = this.getById(serviceId);
        if(service) {

            socketService.emit(SOCKET_EVENTS.SERVICE_STOP, {
                name: service.name
            });

        }
    };

    SwampServicesStore.prototype.restartService = function(serviceId) {
        var service = this.getById(serviceId);
        if(service) {

            socketService.emit(SOCKET_EVENTS.SERVICE_RESTART, {
                name: service.name,
                environment: service.selectedEnvironment
            });

        }
    };

    SwampServicesStore.prototype.stopAllRunningServices = function() {
        socketService.emit(SOCKET_EVENTS.SWAMP_STOP_ALL, {});
    };

    SwampServicesStore.prototype.restartAllRunningServices = function() {
        socketService.emit(SOCKET_EVENTS.SWAMP_RESTART_ALL, {});
    };

    SwampServicesStore.prototype.startAllServices = function() {
        socketService.emit(SOCKET_EVENTS.SWAMP_START_ALL, {});
    };

    SwampServicesStore.prototype.emitChange = function() {
        this.emitEvent(CHANGE_EVENT);
    };

    SwampServicesStore.prototype.addChangeListener = function(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    SwampServicesStore.prototype.removeChangeListener = function(callback) {
        this.off(CHANGE_EVENT, callback);
    };

    return SwampServicesStore;
});