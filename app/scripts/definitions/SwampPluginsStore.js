define(['EventEmitter', 'services/serializeService', 'definitions/SwampPlugin', 'env'], function(EventEmitter, serializeService, SwampPlugin, env) {

    var CHANGE_EVENT = 'change';

    function SwampPluginsStore(internalPluginsPath) {
        this.super = EventEmitter;
        this.super();

        this._pluginsRepository = {};

        if(internalPluginsPath) {
            _.forEach(internalPluginsPath, function(internalPluginPath) {
                _initInternalPlugin.call(this, internalPluginPath);
            }.bind(this));
        }
    }

    SwampPluginsStore.prototype = new EventEmitter;

    SwampPluginsStore.prototype.addPlugin = function(plugin) {

        this._pluginsRepository[plugin.id] = plugin;

    };

    SwampPluginsStore.prototype.count = function() {
        return Object.keys(this._pluginsRepository).length;
    };

    SwampPluginsStore.prototype.getAll = function() {
        return this._pluginsRepository;
    };

    SwampPluginsStore.prototype.getById = function(id) {
        return this._pluginsRepository[id];
    };

    SwampPluginsStore.prototype.getByName = function(name) {
        return _.filter(this._pluginsRepository, function(plugin) {
            return plugin.name == name;
        })[0];
    };

    SwampPluginsStore.prototype.emitChange = function() {
        this.emitEvent(CHANGE_EVENT);
    };

    SwampPluginsStore.prototype.addChangeListener = function(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    SwampPluginsStore.prototype.removeChangeListener = function(callback) {
        this.off(CHANGE_EVENT, callback);
    };

    function _initInternalPlugin(internalPluginPath) {
        $.getJSON(internalPluginPath + 'swamp.json')
            .then(_swampPluginDescriptorLoaded.bind(this, internalPluginPath))
    }

    function _swampPluginDescriptorLoaded(path, descriptor) {

        descriptor.version = env.swampVersion;

        var serialized = serializeService.serializeSwampPlugin(descriptor, path);

        this.addPlugin(new SwampPlugin(serialized));
    }

    return SwampPluginsStore;
});