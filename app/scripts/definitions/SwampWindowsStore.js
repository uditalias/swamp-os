define(['EventEmitter', 'definitions/SwampWindow'], function(EventEmitter, SwampWindow) {

    var CHANGE_EVENT = 'change';

    function SwampWindowsStore() {
        this.super = EventEmitter;
        this.super();

        this._currentZindex = 50;
        this._windowsRepository = {};
        this._lastFocusId = null;
    }

    SwampWindowsStore.prototype = new EventEmitter;

    SwampWindowsStore.prototype.createWindow = function(type, payload, options) {

        var existWindow = this.getWindowByTypeAndPayloadId(type, payload.name);

        if(!existWindow) {
            existWindow = new SwampWindow(type, payload, options);
            this.addWindow(existWindow);
        }

        this.focusWindow(existWindow.id);
    };

    SwampWindowsStore.prototype.addWindow = function(win) {
        if(!this._windowsRepository[win.id]) {
            this._windowsRepository[win.id] = win;
        } else {
            this.focusWindow(win.id);
        }
    };

    SwampWindowsStore.prototype.getWindowByTypeAndPayloadId = function(type, payloadId) {
        return _.filter(this._windowsRepository, function(win) {
            return win.getType() == type && win.getPayloadId() == payloadId;
        })[0];
    };

    SwampWindowsStore.prototype.getWindowById = function(winId) {
        return this._windowsRepository[winId];
    };

    SwampWindowsStore.prototype.focusWindow = function(winId) {
        _.forEach(this._windowsRepository, function(_win) {

            if(_win.isFocused()) {
                this._lastFocusId = _win.id;
            }

            _win.id != winId ? _win.blur() : _win.focus(this._currentZindex++);
        }.bind(this));
    };

    SwampWindowsStore.prototype.closeWindow = function(windowId) {
        this._windowsRepository[windowId] = null;
        delete this._windowsRepository[windowId];

        if(this._lastFocusId && this._windowsRepository[this._lastFocusId]) {
            this.focusWindow(this._lastFocusId);
        } else {
            this._lastFocusId = null;
        }
    };

    SwampWindowsStore.prototype.zoomWindow = function(windowId) {
        var win = this.getWindowById(windowId);
        if(win) {
            win.toggleZoom();
        }
    };

    SwampWindowsStore.prototype.minimizeWindow = function(windowId) {
        var win = this.getWindowById(windowId);
        if(win) {
            win.toggleMinimize();
        }
    };

    SwampWindowsStore.prototype.setWindowPrompt = function(windowId, promptText, onConfirm, onCancel) {
        var win = this.getWindowById(windowId);
        if(win) {
            win.setPrompt(promptText, onConfirm, onCancel);
        }
    };

    SwampWindowsStore.prototype.responseWindowPrompt = function(windowId, confirm) {
        var win = this.getWindowById(windowId);
        if(win) {
            if(confirm) {
                win.confirmPrompt();
            } else {
                win.cancelPrompt();
            }
        }
    };

    SwampWindowsStore.prototype.minimizeAllWindows = function() {
        _.forEach(this._windowsRepository, function(win) {
            if(!win.isMinimized() && win.isMinimizable()) {
                win.toggleMinimize();
            }
        });
    };

    SwampWindowsStore.prototype.closeAllWindows = function() {
        _.forEach(this._windowsRepository, function(win) {
            this.closeWindow(win.id);
        }.bind(this));
    };

    SwampWindowsStore.prototype.arrangeAllWindows = function() {
        var nextTop = 0;
        var nextLeft = 0;
        var factor = 30;

        var zIndexStortedRepo = _.sortBy(this._windowsRepository, function(win) {
            return win.getZindex();
        }, this);

        _.forEach(zIndexStortedRepo, function(win) {
            nextTop += factor;
            nextLeft += factor;
            win.setPosition(nextTop, nextLeft);

        });
    };

    SwampWindowsStore.prototype.getAll = function() {
        return this._windowsRepository;
    };

    SwampWindowsStore.prototype.emitChange = function() {
        this.emitEvent(CHANGE_EVENT);
    };

    SwampWindowsStore.prototype.addChangeListener = function(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    SwampWindowsStore.prototype.removeChangeListener = function(callback) {
        this.off(CHANGE_EVENT, callback);
    };

    return SwampWindowsStore;
});