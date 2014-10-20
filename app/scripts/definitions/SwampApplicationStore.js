define(['EventEmitter'], function(EventEmitter) {

    var CHANGE_EVENT = 'change';

    function SwampApplicationStore() {
        this.super = EventEmitter;
        this.super();

        this._prompt = null;
        this._contextMenu = null;
    }

    SwampApplicationStore.prototype = new EventEmitter;

    SwampApplicationStore.prototype.setPrompt = function(promptText, onConfirm, onCancel) {
        this._prompt = {
            text: promptText,
            onConfirm: onConfirm || function() {},
            onCancel: onCancel || function() {},
            okBtnText: 'OK',
            cancelBtnText: 'Cancel'
        };
    };

    SwampApplicationStore.prototype.hasPrompt = function() {
        return !!this._prompt;
    };

    SwampApplicationStore.prototype.getPrompt = function() {
        return this._prompt;
    };

    SwampApplicationStore.prototype.confirmPrompt = function() {
        this._prompt && this._prompt.onConfirm();
        this.clearPrompt();
    };

    SwampApplicationStore.prototype.cancelPrompt = function() {
        this._prompt && this._prompt.onCancel();
        this.clearPrompt();
    };

    SwampApplicationStore.prototype.clearPrompt = function() {
        this._prompt = null;
    };

    SwampApplicationStore.prototype.setContextMenu = function(items, position) {
        this._contextMenu = {
            items: items,
            position: position
        };
    };

    SwampApplicationStore.prototype.hasContextMenu = function() {
        return !!this._contextMenu;
    };

    SwampApplicationStore.prototype.getContextMenu = function() {
        return this._contextMenu;
    };

    SwampApplicationStore.prototype.clearContextMenu = function() {
        this._contextMenu = null;
    };

    SwampApplicationStore.prototype.emitChange = function() {
        this.emitEvent(CHANGE_EVENT);
    };

    SwampApplicationStore.prototype.addChangeListener = function(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    SwampApplicationStore.prototype.removeChangeListener = function(callback) {
        this.off(CHANGE_EVENT, callback);
    };

    return SwampApplicationStore;

});