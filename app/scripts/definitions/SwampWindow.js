define([
        'EventEmitter',
        'constants/DEFAULT_WINDOW_OPTIONS',
        'constants/WINDOW_TYPE'
    ],

    function(EventEmitter, DEFAULT_WINDOW_OPTIONS, WINDOW_TYPE) {

        function SwampWindow(type, payload, options) {
            this.super = EventEmitter;
            this.super();

            this.id = _.guid();
            this._payload = payload;
            this._payloadId = this._payload.name;
            this._type = type;
            this._title = (this._payload.config && this._payload.config.title) ? this._payload.config.title : '';
            this._menuTree = null;
            this._focused = false;
            this._zoomed = false;
            this._minimized = false;
            this._prompt = null;

            if(this._type == WINDOW_TYPE.PLUGIN) {
                if(this._payload.config && this._payload.config.window) {
                    options = this._payload.config.window;
                }
            }

            this.options = _.defaults(options || {}, _.cloneDeep(DEFAULT_WINDOW_OPTIONS));

            this.setInitialPosition();
        }

        SwampWindow.prototype = new EventEmitter;

        SwampWindow.prototype.getMenuTree = function() {
            return this._menuTree;
        };

        SwampWindow.prototype.setMenuTree = function(menuTree) {
            this._menuTree = menuTree;
        };

        SwampWindow.prototype.hasMenu = function() {
            return !!this._menuTree;
        };

        SwampWindow.prototype.getType = function() {
            return this._type;
        };

        SwampWindow.prototype.getPayloadId = function() {
            return this._payloadId;
        };

        SwampWindow.prototype.getPayload = function() {
            return this._payload;
        };

        SwampWindow.prototype.setPrompt = function(promptText, onConfirm, onCancel) {
            this._prompt = {
                text: promptText,
                onConfirm: onConfirm || function() {},
                onCancel: onCancel || function() {},
                okBtnText: 'OK',
                cancelBtnText: 'Cancel'
            };
        };

        SwampWindow.prototype.hasPrompt = function() {
            return !!this._prompt;
        };

        SwampWindow.prototype.getPrompt = function() {
            return this._prompt;
        };

        SwampWindow.prototype.confirmPrompt = function() {
            this._prompt && this._prompt.onConfirm();
            this.clearPrompt();
        };

        SwampWindow.prototype.cancelPrompt = function() {
            this._prompt && this._prompt.onCancel();
            this.clearPrompt();
        };

        SwampWindow.prototype.clearPrompt = function() {
            this._prompt = null;
        };

        SwampWindow.prototype.getPosition = function() {
            return this.options.position;
        };

        SwampWindow.prototype.getSize = function() {
            return this.options.size;
        };

        SwampWindow.prototype.isDraggable = function() {
            return this.options.draggable;
        };

        SwampWindow.prototype.isResizable = function() {
            return this.options.resizable;
        };

        SwampWindow.prototype.isMinimizable = function() {
            return this.options.minimizable;
        };

        SwampWindow.prototype.isMaximizable = function() {
            return this.options.maximizable;
        };

        SwampWindow.prototype.isClosable = function() {
            return this.options.closable;
        };

        SwampWindow.prototype.getTitle = function() {
            return this._title || this._payloadId;
        };

        SwampWindow.prototype.setTitle = function(title) {
            this._title = title;
        };

        SwampWindow.prototype.focus = function(zIndex) {
            this._focused = true;
            this.options.zIndex = zIndex ? zIndex : this.options.zIndex;
        };

        SwampWindow.prototype.blur = function() {
            this._focused = false;
        };

        SwampWindow.prototype.toggleZoom = function() {
            this._zoomed = !this._zoomed;

            if(this.isZoomed() && this.isMinimized()) {
                this.toggleMinimize();
            }
        };

        SwampWindow.prototype.toggleMinimize = function() {
            this._minimized = !this._minimized;

            if(this.isMinimized() && this.isZoomed()) {
                this.toggleZoom();
            }
        };

        SwampWindow.prototype.isFocused = function() {
            return this._focused;
        };

        SwampWindow.prototype.isZoomed = function() {
            return this._zoomed;
        };

        SwampWindow.prototype.isMinimized = function() {
            return this._minimized;
        };

        SwampWindow.prototype.getMinWidth = function() {
            return this.options.minWidth;
        };

        SwampWindow.prototype.getMinHeight = function() {
            return this.options.minHeight;
        };

        SwampWindow.prototype.getZindex= function() {
            return this.options.zIndex;
        };

        SwampWindow.prototype.getOptionsClasses = function() {
            var classNames = [];

            if(this.isFocused()) {
                classNames.push('focused');
            }

            if(this.isZoomed()) {
                classNames.push('zoomed');
            }

            if(this.isMinimized()) {
                classNames.push('minimized');
            }

            return classNames;
        };

        SwampWindow.prototype.setInitialPosition = function() {

            var wh = $(window).outerHeight(true);
            var ww = $(window).outerWidth(true);

            this.options.position.top = (wh / 2) - (this.options.size.height / 2);
            this.options.position.top = this.options.position.top > 0 ? this.options.position.top : 0;

            this.options.position.left = (ww / 2) - (this.options.size.width / 2);
            this.options.position.left = this.options.position.left > 0 ? this.options.position.left : 0;

        };

        SwampWindow.prototype.setPosition = function(top, left) {
            this.options.position.top = top;
            this.options.position.left = left;
        };

        return SwampWindow;
    });
