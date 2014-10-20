define([
        'react',
        'jsx!components/window/windowtitle/WindowTitle',
        'jsx!components/window/windowmenu/WindowMenu',
        'jsx!components/window/windowprompt/WindowPrompt',
        'jsx!components/window/swamppluginwindowcontent/SwampPluginWindowContent',
        'jsx!components/window/swampservicewindowcontent/SwampServiceWindowContent',
        'constants/WINDOW_TYPE',
        'constants/SERVICE_STATE',
        'actions/client'
    ],
    function(React, WindowTitle, WindowMenu, WindowPrompt, SwampPluginWindowContent, SwampServiceWindowContent, WINDOW_TYPE, SERVICE_STATE, clientActions) {

        var Window = React.createClass({

            getInitialState: function() {
                return {
                    menuTree: this.props.descriptor.getMenuTree()
                };
            },

            componentDidMount: function() {

                this._setupWindowOptions();

                $(this.getDOMNode()).on('mousedown', this._onMouseDown);

            },

            componentWillUnmount: function() {

                $(this.getDOMNode()).off('mousedown', this._onMouseDown);

                this._destroyWindowOptions();

                this.props.descriptor = null;

            },

            render: function() {

                var classNames = 'window flex flex-vbox ';

                classNames += this.props.descriptor.getOptionsClasses().join(' ');

                var indicator = this._getIndicator();

                var windowPrompt = this._getWindowPrompt();

                var cover = this._getCover();

                setTimeout(this._handleUIOptions, 0);
                setTimeout(function() {
                    $(this.getDOMNode()).addClass('in');
                }.bind(this), 0);

                return (
                    <div className={classNames} style={ { zIndex: this.props.descriptor.getZindex(), top: this.props.descriptor.getPosition().top, left: this.props.descriptor.getPosition().left } }>
                        <div className="window-title-wrapper">

                            <WindowTitle
                                indicator={indicator}
                                isZoomed={this.props.descriptor.isZoomed()}
                                onZoom={this._onZoomClick}
                                onMinimize={this._onMinimizeClick}
                                onClose={this._onCloseClick}
                                maximizable={this.props.descriptor.isMaximizable()}
                                minimizable={this.props.descriptor.isMinimizable()}
                                text={this.props.descriptor.getTitle()}
                            />

                        </div>
                        <div className={ (this.props.descriptor.isMinimized() ? 'hidden' : '') + ' flex flex-vbox flex-1'}>
                            <div className="window-menu-wrapper">
                                {this._getWindowMenu()}
                            </div>
                            <div className="flex-1 flex flex-vbox window-content-wrapper">
                                {windowPrompt}
                                {cover}
                                {this._getWindowContent()}
                            </div>
                        </div>
                    </div>
                    );
            },

            _getWindowMenu: function() {

                if(this.props.descriptor.hasMenu()) {
                    return <WindowMenu items={this.props.descriptor.getMenuTree()} />;
                }

                return null;
            },

            _getWindowContent: function() {
                switch(this.props.descriptor.getType()) {
                    case WINDOW_TYPE.SERVICE:
                        return <SwampServiceWindowContent service={this.props.descriptor.getPayload()} windowId={this.props.descriptor.id} />;
                    case WINDOW_TYPE.PLUGIN:
                        return <SwampPluginWindowContent plugin={this.props.descriptor.getPayload()} onPluginRequest={this._onPluginRequest} windowId={this.props.descriptor.id} />;
                }
            },

            _onPluginRequest: function(data) {
                if(data.name) {
                    switch (data.name) {
                        case 'setMenuTree':
                            this.props.descriptor.setMenuTree(data.payload);
                            this.setState({ menuTree: this.props.descriptor.getMenuTree() });
                    }
                }
            },

            _getCover: function() {
                if(this.props.descriptor.getType() == WINDOW_TYPE.PLUGIN) {
                    return <div className="spread cover" style={ { 'display': !this.props.descriptor.isFocused() ? 'block' : 'none' } }></div>;
                }
                return null;
            },
            _getIndicator: function() {

                switch(this.props.descriptor.getType()) {
                    case WINDOW_TYPE.SERVICE:
                        var state = this.props.descriptor.getPayload().state;

                        if(state == SERVICE_STATE.STOP) {
                            return { color: 'red' }
                        } else if(state == SERVICE_STATE.RUN) {
                            return { color: 'green' }
                        } else {
                            return { color: 'yellow' }
                        }

                        break;
                }

                return null;
            },

            _getWindowPrompt: function() {

                if(this.props.descriptor.hasPrompt()) {
                    return <WindowPrompt prompt={this.props.descriptor.getPrompt()} windowId={this.props.descriptor.id} />;
                }

                return null;
            },

            _destroyWindowOptions: function() {
                if(this.props.descriptor.isResizable()) {
                    $(this.getDOMNode()).resizable('destroy');
                }

                if(this.props.descriptor.isDraggable()) {
                    $(this.getDOMNode()).draggable('destroy');
                }
            },

            _setupWindowOptions: function() {
                if(this.props.descriptor.isResizable()) {
                    this._setupResize();
                }

                if(this.props.descriptor.isDraggable()) {
                    this._setupDraggable();
                }

                $(this.getDOMNode()).css(this.props.descriptor.getPosition());
                $(this.getDOMNode()).css(this.props.descriptor.getSize());
            },

            _setupResize: function() {

                var $el = $(this.getDOMNode());

                $el.resizable({
                    containment: this.props.containerSelector,
                    minWidth: this.props.descriptor.getMinWidth(),
                    minHeight: this.props.descriptor.getMinHeight(),
                    stop: this._onResizeEnd,
                    start: this._onResizeStart
                });

                $el = null;

            },

            _setupDraggable: function() {

                var $el = $(this.getDOMNode());

                $el.draggable({
                    handle: '.window-title-wrapper',
                    cancel: '.window-action',
                    containment: this.props.containerSelector,
                    scroll: false,
                    stop: this._onDragEnd,
                    start: this._onDragStart
                });

                $el = null;

            },

            _handleUIOptions: function() {

                var $el = $(this.getDOMNode());

                if(this.props.descriptor.isZoomed()) {
                    this.props.descriptor.isDraggable() &&  $el.draggable('disable');
                    this.props.descriptor.isResizable() && $el.resizable('disable');
                } else {
                    this.props.descriptor.isDraggable() && $el.draggable('enable');
                    this.props.descriptor.isResizable() && $el.resizable('enable');
                }

                if(this.props.descriptor.isMinimized()) {
                    this.props.descriptor.isResizable() && $el.resizable('disable');
                } else {
                    this.props.descriptor.isResizable()  && !this.props.descriptor.isZoomed() && $el.resizable('enable');
                }

                $el = null;

            },

            _onResizeEnd: function(e) {
                $(this.getDOMNode()).find('.cover').hide();
            },

            _onResizeStart: function(e) {
                $(this.getDOMNode()).find('.cover').show();
            },

            _onDragEnd: function(e) {
                var position = $(this.getDOMNode()).position();
                this.props.descriptor.setPosition(position.top, position.left);
                $(this.getDOMNode()).find('.cover').hide();
            },

            _onDragStart: function(e) {
                $(this.getDOMNode()).find('.cover').show();
            },

            _onMouseDown: function(e) {
                e.stopPropagation();
                e.preventDefault();

                if(!this.props.descriptor.isFocused()) {
                    clientActions.focusWindow(this.props.descriptor.id);
                }

                return false;
            },

            _onCloseClick: function() {
                clientActions.closeWindow(this.props.descriptor.id);
            },

            _onZoomClick: function() {
                if(this.props.descriptor.isMaximizable()) {
                    clientActions.zoomWindow(this.props.descriptor.id);
                }
            },

            _onMinimizeClick: function() {
                if(this.props.descriptor.isMinimizable()) {
                    clientActions.minimizeWindow(this.props.descriptor.id);
                }
            }
        });

        return Window;
    });