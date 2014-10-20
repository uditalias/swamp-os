define([
        'EventEmitter'
    ],

    function(EventEmitter) {

        function SwampPlugin(params) {
            this.super = EventEmitter;
            this.super();

            this.id = params.id;
            this.name = params.name;
            this.basePath = params.basePath;
            this.version = params.version;
            this.main = params.main || "index.html";
            this.config = params.config;
            this._loaded = false;
        }

        SwampPlugin.prototype = new EventEmitter;

        SwampPlugin.prototype.dispatchLoadEvent = function() {

            this._loaded = true;

            this.emit('loaded');
        };

        SwampPlugin.prototype.isLoaded = function() {
            return this._loaded;
        };

        SwampPlugin.prototype.unLoad = function() {
            this._loaded = false;
        };

        SwampPlugin.prototype.sendMessage = function(payload) {
            this.emit('message', payload);
        };

        return SwampPlugin;
    });