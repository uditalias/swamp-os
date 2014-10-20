define(['EventEmitter'], function(EventEmitter) {

    var CHANGE_EVENT = 'change';

    function SwampIconsStore() {
        this.super = EventEmitter;
        this.super();

        this._iconsRepository = {};
    }

    SwampIconsStore.prototype = new EventEmitter;

    SwampIconsStore.prototype.getAll = function() {
        return this._iconsRepository;
    };

    SwampIconsStore.prototype.emitChange = function() {
        this.emitEvent(CHANGE_EVENT);
    };

    SwampIconsStore.prototype.addChangeListener = function(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    SwampIconsStore.prototype.removeChangeListener = function(callback) {
        this.off(CHANGE_EVENT, callback);
    };

    return SwampIconsStore;
});