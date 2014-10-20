define(['EventEmitter'], function(EventEmitter) {

    var CHANGE_EVENT = 'change';

    function MenuItemsStore(menuItems) {
        this.super = EventEmitter;
        this.super();

        this._menuItems = menuItems;
    }

    MenuItemsStore.prototype = new EventEmitter;

    MenuItemsStore.prototype.getAll = function() {
        return this._menuItems;
    };

    MenuItemsStore.prototype.emitChange = function() {
        this.emitEvent(CHANGE_EVENT);
    };

    MenuItemsStore.prototype.addChangeListener = function(callback) {
        this.on(CHANGE_EVENT, callback);
    };

    MenuItemsStore.prototype.removeChangeListener = function(callback) {
        this.off(CHANGE_EVENT, callback);
    };

    return MenuItemsStore;
});