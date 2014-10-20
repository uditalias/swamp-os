define(['EventEmitter', 'constants/AGGREGATED_LIST_TYPE', 'definitions/AggregatedData'],
    function(EventEmitter, AGGREGATED_LIST_TYPE, AggregatedData) {

        var CHANGE_EVENT = 'change',
            _DEFAULT_TITLE = document.title,
            _TITLE_TOGGLE_INTERVAL = 1500,
            _TITLE_TOGGLE_TIMER = null;

        function SwampLogsStore() {
            this.super = EventEmitter;
            this.super();

            this._errorLogData = null;
            this._outLogData = null;
            this._isPanelOpen = false;
            this._isBrowserFocused = true;

            this._createLogDataContainers();
        }

        SwampLogsStore.prototype = new EventEmitter;

        SwampLogsStore.prototype.isPanelOpen = function() {
            return this._isPanelOpen;
        };

        SwampLogsStore.prototype.setPanelState = function(isOpen) {
            this._isPanelOpen = !!isOpen;

            if(this._isPanelOpen) {
                this.markAllAsRead();
            }
        };

        SwampLogsStore.prototype.getAll = function() {
            return {
                error: this._errorLogData.getAll(),
                out: this._outLogData.getAll()
            }
        };

        SwampLogsStore.prototype.markAllOutAsRead = function() {

            this._outLogData.each(function(item, index, isQueued) {
                item.read = true;
            });

        };

        SwampLogsStore.prototype.markAllErrorAsRead = function() {

            this._errorLogData.each(function(item, index, isQueued) {
                item.read = true;
            });

        };

        SwampLogsStore.prototype.markAllAsRead = function() {
            this.markAllOutAsRead();
            this.markAllErrorAsRead();
        };

        SwampLogsStore.prototype.getUnreadOutCount = function() {
            var count = 0;

            this._outLogData.each(function(item) {
                count += !item.read ? 1 : 0;
            });

            return count;
        };

        SwampLogsStore.prototype.getUnreadErrorCount = function() {
            var count = 0;

            this._errorLogData.each(function(item) {
                count += !item.read ? 1 : 0;
            });

            return count;
        };

        SwampLogsStore.prototype.getUnreadCount = function() {
            return this.getUnreadOutCount() + this.getUnreadErrorCount();
        };

        SwampLogsStore.prototype.addOut = function(message) {

            if(this.isPanelOpen()) {
                message.read = true;
            }

            this._outLogData.add(message);

            if(!_TITLE_TOGGLE_TIMER && !this._isBrowserFocused) {
                this.toggleTitle('New Notifications...');
            }
        };

        SwampLogsStore.prototype.addError = function(message) {

            if(this.isPanelOpen()) {
                message.read = true;
            }

            this._errorLogData.add(message);

            if(!_TITLE_TOGGLE_TIMER && !this._isBrowserFocused) {
                this.toggleTitle('New Notifications...');
            }
        };

        SwampLogsStore.prototype.setIsBrowserFocused = function(state) {

            this._isBrowserFocused = state;

            if(state) {
                this.cancelToggleTitle();
            }

        };

        SwampLogsStore.prototype.toggleTitle = function(title) {

            if(document.title == title) {
                document.title = _DEFAULT_TITLE;
            } else {
                document.title = title;
            }

            _TITLE_TOGGLE_TIMER = window.setTimeout(this.toggleTitle.bind(this, title), _TITLE_TOGGLE_INTERVAL);

        };

        SwampLogsStore.prototype.cancelToggleTitle = function() {
            window.clearTimeout(_TITLE_TOGGLE_TIMER);
            _TITLE_TOGGLE_TIMER = null;
            document.title = _DEFAULT_TITLE;
        };

        SwampLogsStore.prototype._createLogDataContainers = function() {

            this._outLogData = new AggregatedData(AGGREGATED_LIST_TYPE.FIFO);

            this._errorLogData = new AggregatedData(AGGREGATED_LIST_TYPE.FIFO);

        };

        SwampLogsStore.prototype.emitChange = function() {
            this.emitEvent(CHANGE_EVENT);
        };

        SwampLogsStore.prototype.addChangeListener = function(callback) {
            this.on(CHANGE_EVENT, callback);
        };

        SwampLogsStore.prototype.removeChangeListener = function(callback) {
            this.off(CHANGE_EVENT, callback);
        };

        return SwampLogsStore;
    });